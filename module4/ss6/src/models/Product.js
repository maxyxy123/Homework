const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 5, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    // No default: existing documents can genuinely lack this field.
    stock: { type: Number, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
