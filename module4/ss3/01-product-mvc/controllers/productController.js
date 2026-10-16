const Product = require('../models/Product');
exports.getProducts = (req, res) => res.json(Product.getAll());
exports.createProduct = (req, res) => res.status(201).json(Product.create(req.body));
