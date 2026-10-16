# Bài tập Express – MVC, Upload và xử lý lỗi

Mình chia 5 yêu cầu thành 5 thư mục nhỏ trong cùng một project để không bị trùng tên `app.js`, `models` và `routes`. Mỗi phần chạy độc lập, còn bài cuối là API blog tổng hợp đầy đủ các kiến thức.

## Chạy project

Cần cài Node.js. Mở terminal tại thư mục này và chạy:

```bash
npm install
npm run product    # Bài 1 – cổng 3001
npm run upload     # Bài 2 – cổng 3002
npm run users      # Bài 3 – cổng 3003
npm run employees  # Bài 4 – cổng 3004
npm run blog       # Bài 5 – cổng 3005
npm test           # Kiểm tra tự động
```

Mỗi lần chọn một lệnh chạy; nhấn Ctrl+C để dừng. Dùng Postman gửi request tới localhost theo cổng tương ứng. Xem `05-blog-role-api/README.md` để đọc bảng endpoint và các kịch bản test của bài cuối.

Các mảng dữ liệu chỉ nằm trong RAM. Ảnh lưu tại thư mục `uploads` của từng bài; server sẽ tự tạo thư mục này. MIME type được kiểm tra theo thông tin file gửi lên, chưa phân tích chữ ký nhị phân nên đây là bản demo phục vụ bài học, không phải hệ thống upload production.
