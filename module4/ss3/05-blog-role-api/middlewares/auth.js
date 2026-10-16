const AppError = require('../utils/AppError');
const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return next(new AppError('Chưa đăng nhập', 401));
  req.user = { id: 1, role: header.trim().toLowerCase() === 'admin' ? 'admin' : 'user' };
  next();
};
const authorize = role => (req, res, next) => {
  if (!req.user || req.user.role !== role) return next(new AppError('Không đủ quyền truy cập', 403));
  next();
};
module.exports = { authenticate, authorize };
