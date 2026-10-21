# Bài thực hành REST API – Nested Resource, Versioning và HATEOAS

## 1. Giới thiệu

Ở bài này mình làm một API nhỏ quản lý đơn hàng và sách. Mục đích là luyện cách thiết kế URL theo REST, đọc query string, sử dụng header để xác định API version và trả về link cho client biết có thể làm gì tiếp theo với đơn hàng.

Mình dùng **Node.js** (module `http` có sẵn), không dùng database để dễ chạy và kiểm tra. Dữ liệu mẫu được lưu trực tiếp trong thư mục `data`.

## 2. Cấu trúc thư mục

```text
rest-api-assignment/
├── data/
│   ├── books.js
│   ├── orders.js
│   └── users.js
├── middlewares/
│   └── versionResolver.js
├── utils/
│   ├── http.js
│   └── links.js
├── postman/
│   ├── collection.json
│   └── env.json
├── screenshots/                 # Chỗ lưu ảnh khi test bằng Postman
├── scripts/
│   └── make-postman.js
├── api.test.js                  # Test tự động bằng Node.js
├── server.js
├── package.json
└── README.md
```

## 3. Cách chạy

Máy cần cài Node.js phiên bản 18 trở lên. Mở terminal tại thư mục project, chạy:

```bash
npm start
```

Server chạy tại `http://localhost:3000`. Có thể mở Postman và gửi request tới địa chỉ này.

Để chạy test viết bằng Node.js (không cần cài thêm package):

```bash
npm test
```

Để chạy Newman, cần cài các thư viện trước (chỉ cần cài một lần):

```bash
npm install
npm run test:api
```

Lưu ý: cần để server chạy ở một terminal khác trước khi chạy Newman. Báo cáo HTML sau khi chạy sẽ nằm tại `reports/newman-report.html`.

## 4. Nested Resource và Query String

Route mình xây dựng:

```http
GET /api/v1/users/:userId/orders
```

Ở đây `userId` được lấy từ URL. `status` dùng để lọc đơn hàng, chỉ nhận `pending`, `paid` hoặc `cancelled`; nếu không có thì lấy toàn bộ trạng thái. `limit` là số đơn tối đa trả về, mặc định là 5. Mình kiểm tra user trước khi lọc đơn nên nếu user không tồn tại, API sẽ trả về mã lỗi **404 – USER_NOT_FOUND** chứ không trả mảng rỗng.

Dữ liệu trong `data/orders.js` gồm **10 đơn hàng thuộc 3 user**. Trường `total` là giá trị tiền của đơn hàng (VND).

### Các URL đã kiểm tra

**Trường hợp 1 – Có cả status và limit**

```http
GET http://localhost:3000/api/v1/users/2/orders?status=paid&limit=3
```

Kết quả (200 OK):

```json
{
  "success": true,
  "data": [
    { "id": 13, "userId": 2, "status": "paid", "total": 200000 },
    { "id": 18, "userId": 2, "status": "paid", "total": 550000 }
  ],
  "meta": { "total": 2 }
}
```

Ở dữ liệu mẫu user 2 chỉ có hai đơn đã thanh toán nên dù `limit=3`, kết quả vẫn chỉ có 2 đơn.

**Trường hợp 2 – Không có query string**

```http
GET http://localhost:3000/api/v1/users/2/orders
```

Kết quả (200 OK): trả về cả 4 đơn hàng của user 2, `meta.total = 4`. Vì không truyền `status` nên không lọc trạng thái; `limit` mặc định bằng 5.

**Trường hợp 3 – User không tồn tại**

```http
GET http://localhost:3000/api/v1/users/999/orders
```

Kết quả (404 Not Found):

```json
{
  "success": false,
  "code": "USER_NOT_FOUND",
  "message": "Khong tim thay user"
}
```

## 5. Header Versioning và Deprecation

Mình giữ chung URL `/api/books`, chỉ thay đổi dữ liệu trả về dựa theo header `Api-Version`. Nếu không truyền header này thì API mặc định sử dụng `v1`.

| Request | Kết quả |
| --- | --- |
| `Api-Version: v1` | HTTP 200; `author` là chuỗi tên tác giả |
| `Api-Version: v2` | HTTP 200; `author` là object `{id, name}` và có thêm `publishedYear` |
| `Api-Version: v9` | HTTP 400; `code = UNSUPPORTED_API_VERSION` |

Hai version đều dùng dữ liệu từ `data/books.js`; mình chỉ format lại ở bước trả response nên không cần tạo hai bộ dữ liệu riêng.

**Ví dụ v1**:

```json
{
  "success": true,
  "data": [
    { "id": 1, "title": "Clean Code", "author": "Robert C. Martin" },
    { "id": 2, "title": "The Pragmatic Programmer", "author": "Andrew Hunt" }
  ]
}
```

**Ví dụ v2** (rút gọn một quyển):

```json
{
  "id": 1,
  "title": "Clean Code",
  "author": { "id": 10, "name": "Robert C. Martin" },
  "publishedYear": 2008
}
```

**Header của response v1** có:

```http
Deprecation: true
Sunset: Wed, 31 Dec 2025 23:59:59 GMT
```

Điều này cho biết `v1` đã được đánh dấu là phiên bản cũ và có mốc ngừng hỗ trợ. Ngày Sunset được giữ đúng theo đề bài (31/12/2025), dù tại thời điểm làm bài mốc này đã qua.

Ảnh cần bổ sung sau khi chạy bằng Postman: `screenshots/books-v1-headers.png` (chọn tab **Headers** ở phần response để thấy `Deprecation` và `Sunset`).

## 6. Postman Collection

Mình tạo sẵn hai file có thể import trực tiếp:

- `postman/collection.json`: 5 request, mỗi request có 2 test script trong tab Tests.
- `postman/env.json`: biến `base_url = http://localhost:3000`.

5 request kiểm tra gồm: orders có query, orders mặc định, user không tồn tại, đơn `pending`, và đơn `cancelled`. Tất cả URL đều bắt đầu bằng `{{base_url}}`.

Mỗi request có một test kiểm tra mã HTTP và một test kiểm tra cấu trúc/nội dung JSON. **Riêng request lỗi 404, mã mong đợi là 404** chứ không phải 200; vì vậy test 404 vẫn được tính PASS khi API trả lỗi đúng thiết kế.

Để chạy trong Postman: Import 2 file JSON → chọn environment **REST API Local** → vào collection → chọn **Run**. Nếu server đang chạy và không sửa dữ liệu mẫu thì dự kiến có **10/10 test PASS**.

Ảnh cần bổ sung sau khi tự chạy Postman Collection Runner: `screenshots/postman-runner.png`.

## 7. Newman

Phần script trong `package.json`:

```json
"test:api": "newman run postman/collection.json -e postman/env.json --reporters cli,htmlextra --reporter-htmlextra-export reports/newman-report.html"
```

Sau khi cài package và bật server, mình có thể dùng một lệnh `npm run test:api` để chạy toàn bộ Collection. Newman sẽ in kết quả trong terminal và xuất báo cáo HTML vào thư mục `reports`.

## 8. HATEOAS – thêm link vào response

Route dùng để lấy chi tiết đơn hàng:

```http
GET /api/v2/orders/:id
```

Mình viết hàm `orderLinks(order)` trong `utils/links.js` để sinh các link liên quan. Với đơn đang `pending`, API trả các link `self`, `customer` và `cancel`. Với đơn đã `cancelled`, API chỉ trả `self` và `customer`, không có `cancel` nữa.

**Test đơn pending:** `GET /api/v2/orders/17`

```json
"_links": {
  "self": { "href": "/api/v2/orders/17", "method": "GET" },
  "customer": { "href": "/api/v2/users/3", "method": "GET" },
  "cancel": { "href": "/api/v2/orders/17/cancellation", "method": "POST" }
}
```

**Test đơn cancelled:** `GET /api/v2/orders/15`

```json
"_links": {
  "self": { "href": "/api/v2/orders/15", "method": "GET" },
  "customer": { "href": "/api/v2/users/3", "method": "GET" }
}
```

So với REST Level 2 (trả tài nguyên qua URL và HTTP method), HATEOAS ở Level 3 bổ sung đường dẫn/hành động ngay trong response. Nhờ đó client có thể biết đơn hàng đang cho phép thao tác nào mà không phải tự đoán từ trạng thái. Ví dụ đơn đã hủy thì không còn link `cancel`. Đây là cách minh họa HATEOAS; route `POST .../cancellation` mới được mô tả bằng link, **chưa triển khai chức năng hủy đơn** trong phạm vi bài GET này.

Ảnh cần bổ sung sau khi test bằng Postman: `screenshots/order-pending.png` và `screenshots/order-cancelled.png`.

## 9. Kết quả kiểm tra

Mình đã chạy bộ test Node.js trong `api.test.js` để kiểm tra các trường hợp chính:

```text
# tests 3
# pass 3
# fail 0
```

Các case gồm: query string và 404 user, version v1/v2/v9 kèm header, và link theo trạng thái đơn hàng. **Đây là kết quả test Node.js, không phải ảnh chụp Postman Runner hay báo cáo Newman.** Phần Postman và Newman cần chạy trên máy có cài các công cụ tương ứng để lấy ảnh và báo cáo thật.

## 10. Nhận xét

Qua bài này mình hiểu rõ hơn vì sao nested resource cần kiểm tra tài nguyên cha trước, và query string nên được validate thay vì lấy thẳng. Phần header versioning giúp mình thấy có thể duy trì nhiều phiên bản API trên cùng một URL. Với HATEOAS, response không chỉ chứa dữ liệu mà còn gợi ý cho client các hành động phù hợp với trạng thái hiện tại.
