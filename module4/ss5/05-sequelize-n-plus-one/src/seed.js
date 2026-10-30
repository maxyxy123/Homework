const { sequelize, Category, Product } = require('./models');
(async () => {
 await sequelize.sync({ force: true }); // Reset database demo.
 const categories = await Category.bulkCreate(Array.from({length:50}, (_, i) => ({ name: 'Category ' + (i+1) })));
 await Product.bulkCreate(categories.flatMap(cat => Array.from({length:10}, (_, i) => ({ categoryId:cat.id, name:'Product '+cat.id+'-'+(i+1), price:100+i }))));
 console.log('50 categories, 500 products'); await sequelize.close();
})().catch(e=>{console.error(e);process.exit(1)});
