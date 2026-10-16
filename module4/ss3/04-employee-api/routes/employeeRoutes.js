const router = require('express').Router();
const c = require('../controllers/employeeController');
const upload = require('../middlewares/upload');
const Employee = require('../models/Employee');
const AppError = require('../utils/AppError');
router.get('/', c.getAll);
router.post('/', c.create);
router.get('/:id', c.getOne);
router.post('/:id/avatar', (req, res, next) => {
  if (!Employee.findById(req.params.id)) return next(new AppError('Không tìm thấy nhân viên', 404));
  next();
}, upload.single('avatar'), c.uploadAvatar);
module.exports = router;
