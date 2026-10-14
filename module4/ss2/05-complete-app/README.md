# Bài 9 (Bài thứ 5) — Ứng dụng đơn hàng hoàn chỉnh
**Chuẩn module: CommonJS (CJS)**. Chọn CJS vì lớp hiện đang học `require` / `module.exports`, dễ tái sử dụng logger, config và so sánh cache ở bài trước.

Chạy `npm install`, `npm start`. `.env` mặc định `PROCESSING_DELAY_MS=2000` và `LOG_TIMEZONE=Asia/Bangkok`.

`created` xuất hiện ngay khi `createOrder()` được gọi; `processed` xuất hiện sau khoảng 2000 ms. Do Event Loop và scheduler, thời gian thực tế có thể **lớn hơn** thời gian đặt ra vài mili-giây; setTimeout không bảo đảm đúng tuyệt đối. Timestamp dùng `toISOString()` theo UTC (đuôi Z) để đảm bảo định dạng ISO ổn định; `LOG_TIMEZONE` được đọc và kiểm tra trong cấu hình nhưng không thay đổi timestamp chuẩn UTC.

## Output kiểm thử mẫu (Node v22.16.0)

```text
[2026-10-14T00:33:45.126Z] Đơn hàng #1 - created
[2026-10-14T00:33:45.130Z] Đơn hàng #2 - created
[2026-10-14T00:33:47.133Z] Đơn hàng #1 - processed
[2026-10-14T00:33:47.133Z] Đơn hàng #2 - processed
```

Chênh lệch trên máy kiểm thử lần lượt là 2007 ms và 2003 ms, sát mức delay cấu hình 2000 ms.
