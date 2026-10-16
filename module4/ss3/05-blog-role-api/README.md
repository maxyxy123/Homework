# Blog API – Bài cuối

## Giới thiệu

Ở bài này mình làm một API blog đơn giản bằng Express, chia code thành Model, Controller, Route và Middleware để dễ theo dõi. Dữ liệu đang được lưu trong mảng nên khi tắt server rồi chạy lại, các bài viết và bình luận mới sẽ mất. Mình dùng cách này vì bài tập chưa yêu cầu database.

Mỗi bài viết có thể có nhiều bình luận, liên kết qua `postId`. Mình cũng thêm phân quyền giả lập: người dùng thông thường có thể bình luận, còn chỉ admin mới được xóa bài viết. Khi xóa bài viết thì các bình luận thuộc bài đó cũng được xóa theo.

## Cách chạy

Tại thư mục gốc của bài tập, chạy `npm install`, sau đó `npm run blog`. Server mở tại `http://localhost:3005`. Có thể dùng Postman để thử các API. Khi cần phân quyền, đặt header `Authorization: admin` hoặc `Authorization: user`. Đây chỉ là mô phỏng, không phải xác thực thật.

## Danh sách API

| Method | Endpoint | Middleware | Công dụng |
| --- | --- | --- | --- |
| GET | `/api/posts` | Logger | Lấy tất cả bài viết |
| GET | `/api/posts/:id` | Logger | Xem một bài viết |
| POST | `/api/posts` | Logger, Multer (thumbnail) | Tạo bài viết, có thể đính kèm ảnh |
| DELETE | `/api/posts/:id` | Logger, authenticate, authorize('admin') | Xóa bài viết và bình luận liên quan |
| GET | `/api/comments/post/:postId` | Logger | Xem bình luận của một bài viết |
| POST | `/api/comments` | Logger, authenticate | Thêm bình luận cho bài viết có thật |

Middleware xử lý lỗi được đặt cuối `app.js` và tiếp nhận lỗi từ các route ở trên. Ảnh upload dùng field `thumbnail`, chỉ nhận JPEG, PNG, WEBP, tối đa 2MB.

## Các trường hợp mình kiểm tra

| Thử nghiệm | Cách thực hiện | Status mong đợi |
| --- | --- | --- |
| Xem bài viết | `GET /api/posts` | 200 |
| Thêm bài viết | `POST /api/posts` với body JSON `{ "title": "Bài mới", "content": "Nội dung" }` | 201 |
| Xóa bài không đăng nhập | `DELETE /api/posts/1`, không có Authorization | 401 |
| User thường xóa bài | `DELETE /api/posts/1`, Authorization: user | 403 |
| Admin xóa bài | `DELETE /api/posts/1`, Authorization: admin | 200 |
| Bình luận vào bài không tồn tại | `POST /api/comments`, Authorization: user, body `{ "postId": 999, "content": "Xin chào" }` | 404 |
| Bình luận thiếu nội dung | `POST /api/comments`, Authorization: user, body `{ "postId": 1 }` | 400 |
| Bình luận hợp lệ | `POST /api/comments`, Authorization: user, body `{ "postId": 1, "content": "Hay quá" }` | 201 |
| Kiểm tra xóa liên đới | Thêm bình luận cho bài 1, xóa bài 1 bằng admin, sau đó GET `/api/comments/post/1` | 201, 200, 404 |
| Upload sai loại file | `POST /api/posts` form-data thumbnail là file PDF | 400 |
| Upload quá 2MB | `POST /api/posts` form-data thumbnail là ảnh >2MB | 400 |

**Lưu ý:** Các kịch bản thay đổi dữ liệu cần chạy đúng thứ tự hoặc khởi động lại server để khôi phục dữ liệu mẫu. Để thử upload, dùng Body → form-data trong Postman, nhập `title`, `content` dạng Text và `thumbnail` dạng File.

## Mình rút ra được gì?

Điểm mình thấy rõ nhất là controller không cần biết mảng dữ liệu được lưu cụ thể như thế nào, vì Model đã đảm nhiệm việc đó. Route chủ yếu dùng để nối URL với controller và gắn middleware. Việc tách như vậy làm code gọn hơn, nhất là lúc thêm upload ảnh và phân quyền. Phần xử lý lỗi chung cũng giúp các trường hợp sai trả về cùng một định dạng JSON, thay vì phải viết lại ở từng chỗ.
