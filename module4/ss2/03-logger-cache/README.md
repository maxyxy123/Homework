# Bài 3 — Logger + CommonJS cache
Chạy `npm install` rồi `node check.js`. File `.env` đặt `LOG_LEVEL=warn`, vì vậy log INFO bị ẩn; WARN và ERROR vẫn hiện. Ba file app cùng `require('./logger')`, Node trả về cùng một object đã cache, nên `initCount = 1`. Có thể đổi `.env` sang `info` hay `error` rồi chạy lại để thử bộ lọc.

## Output mong đợi

```text
[WARN] Thông báo từ app2
[ERROR] Thông báo từ app3
Cùng một object: true
initCount cuối cùng: 1
```
