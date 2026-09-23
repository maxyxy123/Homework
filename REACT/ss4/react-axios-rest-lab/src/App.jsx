import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  getContacts,
  addContact,
  deleteContact,
  searchContacts,
} from "./api/contactsApi";
import {
  updateUserByPut,
  updateUserPhoneByPatch,
} from "./api/usersApi";
import { get } from "./api/httpClient";

const FULL_USER = {
  fullName: "Nguyen Van A",
  email: "vana@example.com",
  phone: "0988888888",
  dateOfBirth: "2002-05-10",
  gender: "male",
  address: "Ha Noi",
  department: "Engineering",
  position: "Frontend Developer",
  employeeCode: "EMP001",
  status: "active",
};

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const controllerRef = useRef(null);

  async function loadContacts() {
    try {
      const data = await getContacts();
      setContacts(data);
      setMessage("GET contacts thành công");
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();

    try {
      const created = await addContact(form);
      setContacts((prev) => [...prev, created]);
      setForm({ name: "", phone: "", email: "" });
      setMessage("POST contact thành công");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((item) => item.id !== id));
      setMessage(`DELETE ${id} thành công`);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleDelete404() {
    try {
      await deleteContact("999999");
    } catch (error) {
      if (error.response?.status === 404) {
        setMessage("Đã bắt đúng lỗi 404 Not Found");
        return;
      }

      setMessage(`Lỗi khác: ${error.message}`);
    }
  }

  async function handlePut() {
    try {
      const data = await updateUserByPut("1", FULL_USER);
      setMessage(`PUT thành công, phone = ${data.phone}`);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handlePatch() {
    try {
      const data = await updateUserPhoneByPatch("1", "0977777777");
      setMessage(`PATCH thành công, phone = ${data.phone}`);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleSearch(value) {
    setKeyword(value);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const data = await searchContacts(value, controller.signal);
      setSearchResults(data);
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }

      console.error("Lỗi search:", error);
      setMessage(error.message);
    }
  }

  function saveToken() {
    localStorage.setItem("accessToken", "demo-token-123");
    setMessage("Đã lưu token demo");
  }

  function removeToken() {
    localStorage.removeItem("accessToken");
    setMessage("Đã xóa token");
  }

  async function testInvalidParams() {
    try {
      const data = await get("/contacts", undefined);
      setMessage(`get(url, undefined) vẫn chạy: ${data.length} contacts`);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <main className="container">
      <h1>Axios + REST + json-server Lab</h1>
      <p>Mock server: http://localhost:3004</p>

      <section>
        <h2>1. GET / POST / DELETE Contacts</h2>

        <form onSubmit={handleAdd} className="row">
          <input
            placeholder="Tên"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            placeholder="Số điện thoại"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <button type="submit">POST</button>
        </form>

        <div className="row">
          <button onClick={loadContacts}>GET danh sách</button>
          <button onClick={handleDelete404}>
            DELETE ID không tồn tại
          </button>
        </div>

        <ul>
          {contacts.map((item) => (
            <li key={item.id}>
              {item.name} - {item.phone}
              <button onClick={() => handleDelete(item.id)}>Xóa</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>2. PUT vs PATCH</h2>
        <p>
          PUT gửi toàn bộ User. PATCH chỉ gửi field cần đổi.
        </p>
        <div className="row">
          <button onClick={handlePut}>PUT toàn bộ User</button>
          <button onClick={handlePatch}>PATCH phone</button>
        </div>

        <pre>{`PUT payload:
{
  fullName,
  email,
  phone,
  dateOfBirth,
  gender,
  address,
  department,
  position,
  employeeCode,
  status
}

PATCH payload:
{
  phone: "0977777777"
}`}</pre>

        <p>
          Nếu dùng PUT nhưng gửi thiếu field trên một REST server theo semantics
          chuẩn, tài nguyên có thể bị thay thế bằng payload mới và các field
          không gửi có thể bị mất hoặc trở thành giá trị mặc định.
        </p>
      </section>

      <section>
        <h2>3. Request Interceptor</h2>
        <div className="row">
          <button onClick={saveToken}>Lưu token demo</button>
          <button onClick={removeToken}>Xóa token</button>
        </div>
      </section>

      <section>
        <h2>4. Response Interceptor</h2>
        <p>
          Xử lý 401 và 500 tập trung trong src/api/httpClient.js.
        </p>
      </section>

      <section>
        <h2>5. Live Search + AbortController</h2>
        <input
          placeholder="Gõ để tìm..."
          value={keyword}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <ul>
          {searchResults.map((item) => (
            <li key={item.id}>
              {item.name} - {item.phone}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>6. Production-style API Module</h2>
        <button onClick={testInvalidParams}>
          Test get(url, undefined)
        </button>
        <p>
          Axios Instance timeout 5000ms, interceptor, response.data,
          clean params, get/post/put/remove.
        </p>
      </section>

      <section className="result">
        <strong>Kết quả:</strong> {message || "Chưa có thao tác"}
      </section>
    </main>
  );
}
