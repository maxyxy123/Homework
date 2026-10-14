# Bài 2 — Event Loop

## Dự đoán (ghi trước khi chạy)

```text
A: Bắt đầu
B: Kết thúc đồng bộ
nextTick
Promise
setTimeout
setImmediate
```

## Kết quả thực tế

Lệnh `node order.js` đã chạy trên Node.js v22.16.0 và in ra nguyên văn:

```text
A: Bắt đầu
B: Kết thúc đồng bộ
nextTick
Promise
setTimeout
setImmediate
```

## Giải thích (4 câu)

Hai lệnh `console.log` A và B chạy đồng bộ nên xuất hiện đầu tiên, trước mọi callback. Sau đó Node xử lý `process.nextTick` trước callback `Promise.then`, vì vậy `nextTick` đứng trước `Promise`. Cả `setTimeout` và `setImmediate` đều được hẹn chạy bất đồng bộ, nên chúng xuất hiện sau hai microtask. Ở lần chạy này `setTimeout` xuất hiện trước `setImmediate`, nhưng **thứ tự giữa hai dòng cuối có thể thay đổi** khi hai hàm được đăng ký từ top-level tùy vào thời điểm vào Event Loop.
