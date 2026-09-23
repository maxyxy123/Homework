# React Axios REST Lab

Tất cả nằm trong đúng 1 folder React.

## Chạy project

```bash
pnpm install
```

Terminal 1:

```bash
pnpm run server
```

JSON Server chạy ở:

```text
http://localhost:3004
```

Terminal 2:

```bash
pnpm run dev
```

## Cấu trúc

```text
react-axios-rest-lab/
├─ db.json
├─ package.json
├─ vite.config.js
├─ index.html
└─ src/
   ├─ api/
   │  ├─ httpClient.js
   │  ├─ contactsApi.js
   │  └─ usersApi.js
   ├─ App.jsx
   ├─ App.css
   └─ main.jsx
```

## Nội dung đã làm

- GET contacts
- POST contact
- DELETE contact
- Bắt lỗi 404 khi DELETE ID không tồn tại
- PUT toàn bộ User
- PATCH riêng phone
- Request interceptor gắn Bearer Token
- Nếu không có token thì bỏ qua
- Response interceptor bắt 401 và 500
- Chỉ trả `response.data`
- Axios timeout 5000ms
- Live search bằng AbortController
- Phân biệt cancel bằng `axios.isCancel()`
- Chuẩn hóa `get/post/put/remove`
- Dọn `params` undefined/null/rỗng
