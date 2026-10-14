# Bài 10 (Bài thứ 6) — Báo cáo so sánh CommonJS và ES Module

Hai thư mục `project-cjs/` và `project-esm/` là hai dự án độc lập dựa trên ứng dụng Bài 9. Mỗi bản có `config.js`, `orderService.js`, `logger.js`, `index.js`, `.env` và `package.json`. Chạy `npm install` riêng trong từng thư mục, sau đó `npm start`. Cả hai nhận cùng hai đơn hàng `{ id: 1, total: 100000 }`, `{ id: 2, total: 250000 }`, phát ra hai log `created` ngay và hai log `processed` sau khoảng 2000 ms. Format đều là `[ISO timestamp] Đơn hàng #id - created|processed`. Giá trị timestamp cụ thể sẽ khác vì thời điểm chạy khác nhau. Cả hai bản cũng có `demo-path-json.js` để thử tình huống tìm thư mục hiện hành và đọc JSON: `node demo-path-json.js`.

## 1. Khác biệt package.json và câu lệnh nhập/xuất

Trong `project-cjs/package.json`:

```json
{"type": "commonjs", "scripts": {"start": "node index.js"}, "dependencies": {"dotenv": "^16.4.7"}}
```

Trong `project-esm/package.json`:

```json
{"type": "module", "scripts": {"start": "node index.js"}, "dependencies": {"dotenv": "^16.4.7"}}
```

Điểm khác biệt chính là `type`. CJS dùng `const OrderService = require('./orderService')` và `module.exports = OrderService`; ESM dùng `import OrderService from './orderService.js'` và `export default class OrderService`. Hai bản cùng dùng Node.js, không cần Babel hay công cụ biên dịch. Đối với dotenv, bản CJS gọi `require('dotenv').config()`, còn ESM dùng `import 'dotenv/config'`.

## 2. Hai khó khăn cụ thể khi chuyển sang ESM và cách giải quyết

**Khó khăn 1 — đường dẫn module phải có phần mở rộng.** Trong CJS, lệnh `require('./orderService')` ở `index.js` hoạt động. Khi chuyển nguyên cách viết đó sang ESM thành `import OrderService from './orderService'`, Node không tìm thấy module và báo `ERR_MODULE_NOT_FOUND`. Tôi sửa thành `import OrderService from './orderService.js'`. Tương tự, ESM trong `orderService.js` phải viết `import config from './config.js'`, không bỏ `.js` như CJS.

**Khó khăn 2 — không có `__dirname` và cách đọc JSON khác.** Trong CJS, `demo-path-json.js` truy cập trực tiếp `__dirname` và `require('./config.json')`. Sang ESM, không thể dùng `__dirname` trực tiếp vì biến đó không được định nghĩa. Bản ESM sửa bằng `path.dirname(fileURLToPath(import.meta.url))`. Còn JSON được đọc với `JSON.parse(readFileSync(new URL('./config.json', import.meta.url), 'utf8'))`, tránh phụ thuộc vào cú pháp import-attribute JSON theo phiên bản Node. Tôi thêm chính hai file `demo-path-json.js` để kiểm tra cùng một đầu ra (ngoại trừ đường dẫn thư mục vốn khác nhau).

## 3. So sánh quá trình chạy và debug

Tôi dùng `node index.js` để kiểm tra trực tiếp hai ứng dụng. Cả CJS và ESM đều có chung 4 dòng theo chu kỳ xử lý: đơn 1 và đơn 2 `created` trước, sau đó hai dòng `processed` sau khoảng hai giây. Nhờ giữ nguyên chuỗi in từ `logger.js`, tôi so sánh được thứ tự sự kiện mà không phải thay đổi code nghiệp vụ. Điểm khác biệt khi kiểm tra lỗi là đường dẫn import: bản CJS cho phép viết gọn `require('./config')`, còn bản ESM cần đúng `./config.js`; lỗi sai tên module xuất hiện ở bước nạp, trước khi chạy `createOrder`. Tình huống JSON và `__dirname` có chương trình thử riêng để tách lỗi môi trường khỏi logic xử lý đơn. `node --trace-uncaught index.js` là lệnh hữu ích nếu muốn xem stack trace trong cả hai bản. Những nhận xét ở mục này xuất phát từ đúng các câu lệnh và cấu trúc file đi kèm, không phải từ một dự án khác.

## 4. Khuyến nghị cho backend thực tế

Nhóm nên chọn **CommonJS** nếu làm backend nhỏ trên Node.js với thời gian triển khai ngắn. Thứ nhất, các module của nhóm dùng `require` / `module.exports` rõ ràng, cùng kiểu với bài logger cache; không phải chuyển toàn bộ import. Thứ hai, CJS cho phép dùng `__dirname` và `require('./config.json')` trực tiếp, thuận tiện khi phải xử lý cấu hình hoặc file dữ liệu trong một ứng dụng học tập. Thứ ba, vì hai bản có hành vi EventEmitter và Event Loop gần như giống nhau, việc dùng ESM chưa mang lại lợi ích rõ rệt cho chức năng của bài này. Nếu hệ thống phát triển thành dự án mới cần thống nhất import/export với frontend và nhiều thư viện ESM-only, nhóm có thể ưu tiên ESM; khi đó phải kiểm tra đường dẫn `.js`, cấu hình `type`, và cách đọc file. Quan trọng nhất là thống nhất một chuẩn module trong một dự án để tránh lỗi lúc khởi động.

## Cách kiểm chứng

Tại thư mục `project-cjs/`, chạy `npm install`, `npm start`, `node demo-path-json.js`. Lặp lại đúng ba lệnh trong `project-esm/`. Quan sát hai dòng `created`, hai dòng `processed`, và so sánh dấu thời gian. `setTimeout` cam kết độ trễ **tối thiểu gần bằng** cấu hình, không bảo đảm chính xác tuyệt đối đến mili-giây vì phụ thuộc tải hệ thống và Event Loop.

## Log mẫu từ lần kiểm thử

**CJS**

```text
[2026-10-14T00:33:47.169Z] Đơn hàng #1 - created
[2026-10-14T00:33:47.173Z] Đơn hàng #2 - created
[2026-10-14T00:33:49.175Z] Đơn hàng #1 - processed
[2026-10-14T00:33:49.175Z] Đơn hàng #2 - processed
```

**ESM**

```text
[2026-10-14T00:33:49.245Z] Đơn hàng #1 - created
[2026-10-14T00:33:49.251Z] Đơn hàng #2 - created
[2026-10-14T00:33:51.253Z] Đơn hàng #1 - processed
[2026-10-14T00:33:51.253Z] Đơn hàng #2 - processed
```

Lần kiểm tra này dùng Node.js 22.16.0 và môi trường `dotenv` tương thích để kiểm chứng khi npm registry không truy cập được. Khi chạy bài trên máy của bạn, `npm install` sẽ cài package `dotenv` chính thức được khai báo trong mỗi `package.json`. Các timestamp này chỉ là output mẫu, không phải giá trị cố định.
