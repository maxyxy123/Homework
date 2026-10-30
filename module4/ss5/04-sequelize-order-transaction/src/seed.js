const { sequelize, Product } = require('./models');
(async () => {
 await sequelize.sync({ force: true }); // Chỉ dùng cho bài tập: reset dữ liệu!
 await Product.bulkCreate([
  { id: 1, name: 'Sach', price: 100000, stock: 10 },
  { id: 5, name: 'But', price: 20000, stock: 3 },
  { id: 8, name: 'Vo', price: 15000, stock: 0 },
 ]);
 console.log('Seeded products'); await sequelize.close();
})().catch(e=>{console.error(e);process.exit(1)});
