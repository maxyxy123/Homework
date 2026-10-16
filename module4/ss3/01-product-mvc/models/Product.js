let products = [{ id: 1, name: 'Bút bi', price: 5000, quantity: 20 }, { id: 2, name: 'Vở', price: 12000, quantity: 10 }];
const getAll = () => products;
const findById = id => products.find(p => p.id === Number(id));
const create = data => {
  const id = products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  const product = { id, name: data.name, price: data.price, quantity: data.quantity };
  products.push(product);
  return product;
};
module.exports = { getAll, create, findById };
