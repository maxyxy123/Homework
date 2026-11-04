# Bài tập MongoDB + Mongoose (5 bài)

## 1. Yêu cầu

- Node.js >= 18; MongoDB đang chạy (cài local, Docker, hoặc MongoDB Atlas).
- Mở terminal trong thư mục `mongoose-homework`.

## 2. Cài đặt

```bash
npm install
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

macOS / Linux:

```bash
cp .env.example .env
```

Nếu MongoDB local, giữ nguyên `MONGODB_URI=mongodb://127.0.0.1:27017/mongoose_homework` trong `.env`. Nếu dùng Atlas, thay bằng connection string của bạn, **không nộp file `.env`**.

Nếu cần chạy MongoDB bằng Docker:

```bash
docker run -d --name mongodb-homework -p 27017:27017 mongo:7
```

## 3. Chạy bài và chụp minh chứng

```bash
npm run seed
npm run exercise:1
npm run exercise:2
npm run exercise:3
npm run exercise:4
npm run exercise:5
```

**Lưu ý:** `npm run seed` **xóa dữ liệu trong 3 collection** `products`, `orders`, `stores` ở database trong `.env` để tạo dữ liệu mẫu. Chỉ dùng trong database bài tập. Chạy `seed` trước bài 2, 4, 5; nếu muốn xem bài 5 thay đổi dữ liệu từ ban đầu, chạy `seed` lại ngay trước bài 5. Bài 1 và 3 có tạo thêm document, nên chạy lặp sẽ tạo bản ghi mới.

| Bài | File | Điểm cần chụp |
|---|---|---|
| 1 | `src/models/Product.js` và `src/exercises/01-product-validation.js` | Schema validation, lỗi input không hợp lệ, `createdAt` / `updatedAt` |
| 2 | `src/exercises/02-logic-operators.js` | Query `$or` + `$lt` và sản phẩm thỏa điều kiện |
| 3 | `src/models/Store.js` và `src/exercises/03-embedded-store.js` | `location.street`, `location.district`, `location.city` trong object Store |
| 4 | `src/models/Order.js` và `src/exercises/04-order-populate.js` | `product_id` trở thành object chi tiết sau `.populate()` |
| 5 | `src/exercises/05-missing-stock.js` | Trước/sau update, `matchedCount`, `modifiedCount`, `stock: 10` |

Ảnh terminal hoặc MongoDB Compass có thể lưu trong thư mục `screenshots/` và đặt tên `bai-1.png` ... `bai-5.png`.

## 4. Kiến thức chính

1. `required`, `minlength` và `min` là Mongoose validators; `{ timestamps: true }` sinh `createdAt`, `updatedAt`.
2. `$or` nối các lựa chọn về danh mục, còn `price: { $lt: 20000 }` đồng thời phải đúng (AND ngầm định). Có thể dùng `$in`.
3. `location` là embedded object nằm trong document Store.
4. `ObjectId` + `ref: 'Product'` dùng tham chiếu; `populate('product_id')` nạp dữ liệu Product tương ứng. Populate là truy vấn bổ sung, không phải embedded document thực sự.
5. `$exists: false` chọn **document thiếu trường**, không chọn trường `stock: null`; `updateMany` + `$set` cập nhật hàng loạt, chạy lặp vẫn an toàn về giá trị.

**Lưu ý production:** `minlength` áp dụng cho chuỗi sau `trim`; `price: 0` được chấp nhận theo đề (không phải `> 0` nghiêm ngặt). `required`/validation trên Schema không có nghĩa mọi thao tác `updateMany` đều được Mongoose kiểm tra validation như `save`.

## 5. Cách nộp

1. Chạy đủ 5 bài, kiểm tra output và chụp 5 ảnh minh chứng trong thư mục `screenshots/`.
2. Nếu giáo viên yêu cầu cả source: nén **thư mục này** thành `mongoose-homework.zip` (bỏ `node_modules` và `.env`). Có thể giữ `.env.example`.
3. Nếu LMS chỉ cho tải 1 file: nộp `.zip`. Nếu LMS yêu cầu link GitHub: đẩy source + README + ảnh lên repo (không commit `.env`). Nếu chỉ yêu cầu ảnh: nộp ảnh theo từng mục bài.
4. Không chỉnh sửa ảnh đầu ra; nên chụp màn hình code và terminal thực tế của bạn.

## 6. Tự kiểm tra trước khi nộp

- Vì sao dùng `$lt: 20000` mà không dùng `$lte: 20000`?
- Vì sao bài 5 **không** update document có `stock: null`?
- `populate` có thay đổi cách dữ liệu được lưu trong MongoDB hay chỉ thay đổi dữ liệu trả về?
