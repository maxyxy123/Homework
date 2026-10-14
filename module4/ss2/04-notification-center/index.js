const EventEmitter = require('node:events');
class NotificationCenter extends EventEmitter {
  // Chuyển lỗi do listener ném thành sự kiện 'error' để chương trình không bị dừng.
  safeEmit(eventName, payload) {
    try { this.emit(eventName, payload); }
    catch (err) { this.emit('error', err); }
  }
}
const center = new NotificationCenter();
center.on('error', (err) => console.log(`[ERROR] ${err.message}`));

center.on('user:registered', ({ name }) => console.log(`[EMAIL] Chào mừng ${name}`));
center.on('user:registered', ({ name }) => console.log(`[STATS] +1 người dùng: ${name}`));

center.on('order:created', ({ id }) => console.log(`[EMAIL] Gửi xác nhận đơn #${id}`));
center.on('order:created', ({ total }) => console.log(`[STATS] Cập nhật doanh thu: +${total}`));

center.on('order:cancelled', ({ id }) => console.log(`[EMAIL] Thông báo hủy đơn #${id}`));
center.on('order:cancelled', ({ id, total }) => {
  if (total > 1000000) throw new Error(`Không thể hủy đơn #${id}: total quá 1000000`);
  console.log(`[STATS] Điều chỉnh doanh thu: -${total}`);
});

const tests = [
  ['user:registered', { name: 'An' }],
  ['order:created', { id: 1, total: 100000 }],
  ['order:cancelled', { id: 1, total: 100000 }],
  ['order:cancelled', { id: 2, total: 1500000 }], // cố tình throw
  ['order:created', { id: 3, total: 75000 }],      // vẫn phải chạy
  ['user:registered', { name: 'Bình' }],
];
for (const [eventName, payload] of tests) center.safeEmit(eventName, payload);
console.log('[SYSTEM] Hoàn tất các sự kiện, chương trình không crash');
