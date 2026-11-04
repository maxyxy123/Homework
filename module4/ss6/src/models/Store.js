const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    street: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true },
  },
});

module.exports = mongoose.model('Store', storeSchema);
