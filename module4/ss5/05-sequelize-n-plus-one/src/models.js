const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Category = sequelize.define('Category', { name: DataTypes.STRING }, { tableName: 'categories' });
const Product = sequelize.define('Product', { name: DataTypes.STRING, price: DataTypes.INTEGER }, { tableName: 'products' });
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });
module.exports = { sequelize, Category, Product };
