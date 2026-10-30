const { DataTypes } = require('sequelize');
const sequelize = require('./db');
module.exports = sequelize.define('Product', {
  name: { type: DataTypes.STRING(200), allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, { tableName: 'products', timestamps: true });
