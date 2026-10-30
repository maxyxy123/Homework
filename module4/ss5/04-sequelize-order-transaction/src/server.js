const express = require('express');
const { sequelize, Product, Order, OrderItem } = require('./models');
require('dotenv').config();
const app = express(); app.use(express.json());
app.post('/api/v1/orders', async (req, res) => {
 const items = req.body?.items;
 if (!Array.isArray(items) || items.length === 0 || items.some(i =>
  !Number.isSafeInteger(i.productId) || i.productId <= 0 || !Number.isSafeInteger(i.qty) || i.qty <= 0
 ) || new Set(items.map(i => i.productId)).size !== items.length) {
  return res.status(400).json({ success: false, error: 'items không hợp lệ hoặc trùng productId' });
 }
 class StockError extends Error {}
 try {
  const order = await sequelize.transaction(async transaction => {
   const products = [];
   // Lock row để 2 request đồng thời không mua vượt kho.
   for (const item of [...items].sort((a,b) => a.productId-b.productId)) {
    const product = await Product.findByPk(item.productId, { transaction, lock: transaction.LOCK.UPDATE });
    if (!product) throw new StockError(`Không tìm thấy sản phẩm ID ${item.productId}`);
    if (product.stock < item.qty) throw new StockError(`Sản phẩm ${product.name} không đủ tồn kho`);
    products.push({ product, item });
   }
   const newOrder = await Order.create({}, { transaction });
   for (const { product, item } of products) {
    await OrderItem.create({ orderId: newOrder.id, productId: product.id, qty: item.qty, unitPrice: product.price }, { transaction });
    await product.decrement('stock', { by: item.qty, transaction });
   }
   return newOrder;
  });
  res.status(201).json({ success: true, data: { orderId: order.id } });
 } catch (err) {
  if (err instanceof StockError) return res.status(409).json({ success: false, error: err.message });
  console.error(err); res.status(500).json({ success: false, error: 'Database error' });
 }
});
(async () => { await sequelize.authenticate(); app.listen(process.env.PORT || 3000, () => console.log('Listening')); })().catch(e=>{console.error(e);process.exit(1)});
