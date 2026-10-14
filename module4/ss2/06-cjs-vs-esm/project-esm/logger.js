import config from './config.js';
export default function attachLogger(service) {
  const print = (status, order) => {
    const instant = new Date();
    const iso = instant.toISOString();
    console.log(`[${iso}] Đơn hàng #${order.id} - ${status}`);
  };
  service.on('order:created', (order) => print('created', order));
  service.on('order:processed', (order) => print('processed', order));
  return { timezone: config.LOG_TIMEZONE };
}
