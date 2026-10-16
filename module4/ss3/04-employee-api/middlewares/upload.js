const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const AppError = require('../utils/AppError');
const folder = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(folder, { recursive: true });
module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, folder),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${crypto.randomUUID()}${path.extname(file.originalname).replace(/[^.a-z0-9]/gi, '').slice(0, 8) || '.img'}`)
  }),
  fileFilter: (req, file, cb) => file.mimetype.startsWith('image/') ? cb(null, true) : cb(new AppError('Chỉ chấp nhận file ảnh', 400)),
  limits: { fileSize: 2 * 1024 * 1024 }
});
