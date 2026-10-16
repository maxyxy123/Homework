module.exports = (err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ success: false, message: 'File vượt quá dung lượng cho phép (2MB)' });
  res.status(err.statusCode || 500).json({ success: false, message: err.message || 'Lỗi máy chủ' });
};
