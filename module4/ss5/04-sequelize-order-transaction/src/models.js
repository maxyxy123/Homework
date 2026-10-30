const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Product = sequelize.define('Product', {
 name: { type: DataTypes.STRING, allowNull: false },
 price: { type: DataTypes.INTEGER, allowNull: false },
 stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, { tableName: 'products' });
const Order = sequelize.define('Order', {}, { tableName: 'orders' });
const OrderItem = sequelize.define('OrderItem', {
 qty: { type: DataTypes.INTEGER, allowNull: false },
 unitPrice: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'order_items' });
Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderId', otherKey: 'productId' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productId', otherKey: 'orderId' });
module.exports = { sequelize, Product, Order, OrderItem };
