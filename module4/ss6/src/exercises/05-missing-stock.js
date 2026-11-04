const { run } = require('../config/db');
const Product = require('../models/Product');

run(async () => {
  const filter = { stock: { $exists: false } };
  console.log('Missing stock BEFORE:', await Product.countDocuments(filter));
  const result = await Product.updateMany(filter, { $set: { stock: 10 } });
  console.log('Matched:', result.matchedCount, 'Modified:', result.modifiedCount);
  console.log('Missing stock AFTER:', await Product.countDocuments(filter));
  console.log('Updated products:', await Product.find({ stock: 10 }).select('name stock').lean());
});
