import OrderService from './orderService.js';
import attachLogger from './logger.js';
const service = new OrderService();
attachLogger(service);
service.createOrder({ id: 1, total: 100000 });
service.createOrder({ id: 2, total: 250000 });
