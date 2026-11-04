const { run } = require('./config/db');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Store = require('./models/Store');

run(async () => {
  // Only removes the sample database collections for this homework.
  await Promise.all([Product.deleteMany({}), Order.deleteMany({}), Store.deleteMany({})]);
  const products = await Product.create([
    { name: 'Laptop Dell', price: 15000, category: 'Laptop' },
    { name: 'Laptop Macbook', price: 35000, category: 'Laptop', stock: 4 },
    { name: 'Mobile Samsung', price: 12000, category: 'Mobile' },
    { name: 'Mobile iPhone', price: 23000, category: 'Mobile', stock: 8 },
    { name: 'Gaming Mouse', price: 700, category: 'Accessory', stock: 20 },
  ]);
  await Order.create({ product_id: products[0]._id, quantity: 2 });
  console.log('Sample data created (5 products, 1 order).');
  console.log('Products missing stock:', await Product.countDocuments({ stock: { $exists: false } }));
});
