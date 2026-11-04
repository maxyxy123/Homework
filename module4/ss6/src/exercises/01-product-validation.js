const { run } = require('../config/db');
const Product = require('../models/Product');

run(async () => {
  const valid = await Product.create({ name: 'Laptop Lenovo', price: 18000, category: 'Laptop' });
  console.log('Valid product:', valid.toObject());
  console.log('Automatic timestamps:', { createdAt: valid.createdAt, updatedAt: valid.updatedAt });

  // Validate in memory, without inserting an invalid document.
  const invalid = new Product({ name: 'PC', price: -1 });
  try {
    await invalid.validate();
  } catch (error) {
    console.log('Expected validation errors:');
    for (const [field, detail] of Object.entries(error.errors)) {
      console.log(`- ${field}: ${detail.message}`);
    }
  }
});
