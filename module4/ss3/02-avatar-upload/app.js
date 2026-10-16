const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const app = express();
const folder = path.join(__dirname, 'uploads');
fs.mkdirSync(folder, { recursive: true });
const allowed = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' };
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, folder),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${crypto.randomUUID()}${allowed[file.mimetype]}`)
  }),
  fileFilter: (req, file, cb) => allowed[file.mimetype] ? cb(null, true) : cb(new Error('Chỉ chấp nhận file ảnh JPEG/PNG/WEBP')),
  limits: { fileSize: 2 * 1024 * 1024 }
});
app.post('/upload/avatar', (req, res) => {
  upload.single('avatar')(req, res, err => {
    if (err) return res.status(400).json({ message: err.code === 'LIMIT_FILE_SIZE' ? 'File vượt quá dung lượng cho phép (2MB)' : err.message });
    if (!req.file) return res.status(400).json({ message: 'Vui lòng chọn file avatar' });
    res.json({ message: 'Upload thành công', filename: req.file.filename, size: req.file.size });
  });
});
module.exports = app;
