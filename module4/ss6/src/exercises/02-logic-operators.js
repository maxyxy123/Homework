const { run } = require('../config/db');
const Product = require('../models/Product');

run(async () => {
  const products = await Product.find({
    $or: [{ category: 'Laptop' }, { category: 'Mobile' }],
    price: { $lt: 20000 },
  }).lean();
  console.log('Laptop OR Mobile AND price < 20000:', products);
  // Equivalent shorter filter: { category: { $in: ['Laptop', 'Mobile'] }, price: { $lt: 20000 } }
});
