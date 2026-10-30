const sequelize = require('./db');
const Product = require('./product');
(async () => {
  await sequelize.sync({ force: true }); // Chỉ dùng cho dữ liệu bài tập.
  await Product.bulkCreate(Array.from({ length: 46 }, (_, i) => ({ name: `${i % 3 === 0 ? 'sach' : 'san pham'} ${i+1}`, price: 10000 + i * 1000, stock: 20 })));
  console.log('Đã tạo 46 products'); await sequelize.close();
})().catch(e => { console.error(e); process.exit(1); });
