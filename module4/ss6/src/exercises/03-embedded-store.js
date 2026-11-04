const { run } = require('../config/db');
const Store = require('../models/Store');

run(async () => {
  const store = await Store.create({
    name: 'Ha Noi Tech Store',
    location: { street: '123 Nguyen Trai', district: 'Thanh Xuan', city: 'Ha Noi' },
  });
  console.log('Store with embedded location:', store.toObject());
});
