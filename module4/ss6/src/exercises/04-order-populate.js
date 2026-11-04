const { run } = require('../config/db');
const Order = require('../models/Order');
require('../models/Product');
run(async () => {
  const order = await Order.findOne().populate('product_id').lean();
  if (!order) {
    console.log('No order found. Run npm run seed first.');
    return;
  }
  console.log('Order with populated product:', order);
});
