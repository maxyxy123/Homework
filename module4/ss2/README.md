# Bài tập Node.js — 6 phần

| Folder | Nội dung | Lệnh chạy |
|---|---|---|
| `01-order-emitter` | EventEmitter: `.on` và `.once` | `node orderService.js` |
| `02-event-loop` | Thứ tự Event Loop | `node order.js` |
| `03-logger-cache` | Logger, LOG_LEVEL, CommonJS cache | `npm install` rồi `node check.js` |
| `04-notification-center` | 3 sự kiện, 2 listeners, xử lý lỗi | `node index.js` |
| `05-complete-app` | Bài 9: app tổng hợp dùng CJS | `npm install` rồi `npm start` |
| `06-cjs-vs-esm` | Bài 10: 2 phiên bản + báo cáo >=300 từ | xem README trong folder |

**Yêu cầu:** Node.js 18+ (khuyên dùng 20 hoặc 22) và npm. Chạy lệnh trong đúng thư mục của mỗi bài. Các bài dùng `dotenv` có `package.json` riêng; khi tải về lần đầu cần chạy `npm install` tại các thư mục `03-logger-cache`, `05-complete-app`, `06-cjs-vs-esm/project-cjs`, `06-cjs-vs-esm/project-esm`. Đã cung cấp sẵn `.env` với giá trị để test.
