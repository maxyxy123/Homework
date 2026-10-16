let employees = [{ id: 1, name: 'Lan', email: 'lan@example.com', avatarUrl: null }];
const getAll = () => employees;
const findById = id => employees.find(e => e.id === Number(id));
const findByEmail = email => employees.find(e => e.email.toLowerCase() === email.toLowerCase());
const create = data => {
  const employee = { id: employees.reduce((m, e) => Math.max(m, e.id), 0) + 1, name: data.name, email: data.email, avatarUrl: null };
  employees.push(employee);
  return employee;
};
const updateAvatar = (id, avatarUrl) => {
  const employee = findById(id);
  if (employee) employee.avatarUrl = avatarUrl;
  return employee;
};
module.exports = { getAll, create, findById, findByEmail, updateAvatar };
