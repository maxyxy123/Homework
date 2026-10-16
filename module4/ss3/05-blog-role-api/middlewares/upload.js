const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const AppError = require('../utils/AppError');
const folder = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(folder, { recursive: true });
const extensions = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' };
module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, folder),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${crypto.randomUUID()}${extensions[file.mimetype]}`)
  }),
  fileFilter: (req, file, cb) => extensions[file.mimetype] ? cb(null, true) : cb(new AppError('Chỉ chấp nhận file ảnh JPEG/PNG/WEBP', 400)),
  limits: { fileSize: 2 * 1024 * 1024 }
});
