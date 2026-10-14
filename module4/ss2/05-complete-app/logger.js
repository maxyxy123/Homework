const config = require('./config');
function attachLogger(service) {
  // ISO 8601 theo UTC là chuẩn chung; timezone dùng để hiển thị thời gian địa phương thêm.
  const print = (status, order) => {
    const instant = new Date();
    const iso = instant.toISOString();
    console.log(`[${iso}] Đơn hàng #${order.id} - ${status}`);
  };
  service.on('order:created', (order) => print('created', order));
  service.on('order:processed', (order) => print('processed', order));
  return { timezone: config.LOG_TIMEZONE };
}
module.exports = attachLogger;
