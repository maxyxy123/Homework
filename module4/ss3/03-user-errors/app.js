const express = require('express');
const AppError = require('./utils/AppError');
const app = express();
app.use(express.json());
const users = [{ id: 1, email: 'lan@example.com' }];
app.get('/users/secret', (req, res, next) => {
  if (!req.headers.authorization) return next(new AppError('Chưa xác thực', 401));
  res.json({ message: 'Nội dung bí mật' });
});
app.get('/users/:id', (req, res, next) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return next(new AppError('Không tìm thấy user', 404));
  res.json(user);
});
app.post('/users', (req, res, next) => {
  if (!req.body.email) return next(new AppError('Thiếu trường email', 400));
  const user = { id: users.reduce((m, u) => Math.max(m, u.id), 0) + 1, email: req.body.email };
  users.push(user);
  res.status(201).json(user);
});
app.use((err, req, res, next) => res.status(err.statusCode || 500).json({ success: false, message: err.message }));
module.exports = app;
