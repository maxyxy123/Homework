const EventEmitter = require('node:events');
class OrderService extends EventEmitter {}
const service = new OrderService();
service.on('order:created', ({ id }) => console.log(`[EMAIL] Đã gửi email xác nhận cho đơn hàng #${id}`));
service.once('order:created', () => console.log('[SYSTEM] Đơn hàng đầu tiên đã được khởi tạo trong hệ thống'));
const orders = [{ id: 1, total: 100000 }, { id: 2, total: 250000 }, { id: 3, total: 75000 }];
for (const order of orders) service.emit('order:created', order);
