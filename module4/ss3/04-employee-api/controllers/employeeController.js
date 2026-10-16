const Employee = require('../models/Employee');
const AppError = require('../utils/AppError');
exports.getAll = (req, res, next) => { try { res.json(Employee.getAll()); } catch (err) { next(err); } };
exports.create = (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) throw new AppError('Thiếu name hoặc email', 400);
    if (Employee.findByEmail(email)) throw new AppError('Email đã tồn tại', 409);
    res.status(201).json(Employee.create({ name, email }));
  } catch (err) { next(err); }
};
exports.getOne = (req, res, next) => {
  try {
    const employee = Employee.findById(req.params.id);
    if (!employee) throw new AppError('Không tìm thấy nhân viên', 404);
    res.json(employee);
  } catch (err) { next(err); }
};
exports.uploadAvatar = (req, res, next) => {
  try {
    if (!req.file) throw new AppError('Thiếu file avatar', 400);
    const employee = Employee.updateAvatar(req.params.id, `/uploads/${req.file.filename}`);
    if (!employee) throw new AppError('Không tìm thấy nhân viên', 404);
    res.json(employee);
  } catch (err) { next(err); }
};
