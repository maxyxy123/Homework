# Bài 4 — NotificationCenter
Chạy `node index.js`. Mỗi sự kiện nghiệp vụ có **chính xác hai** `.on` listener độc lập; có thêm một listener riêng cho sự kiện đặc biệt `error`.

**Giải thích xử lý lỗi:** `EventEmitter` mặc định **không tự chuyển** exception trong listener thành event `error`. Vì vậy `safeEmit()` bắt lỗi đồng bộ bằng `try/catch` rồi chủ động `emit('error', err)`. Listener xử lý lỗi ghi ra console, và vòng lặp tiếp tục emit những sự kiện còn lại. Listener gây lỗi được đăng ký cuối để listener thông báo hủy vẫn chạy trước khi exception được bắt.
