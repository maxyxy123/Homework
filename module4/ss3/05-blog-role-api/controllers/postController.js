const Post = require('../models/Post');
const Comment = require('../models/Comment');
const AppError = require('../utils/AppError');
exports.getAll = (req, res, next) => { try { res.json(Post.getAll()); } catch (err) { next(err); } };
exports.getOne = (req, res, next) => {
  try {
    const post = Post.findById(req.params.id);
    if (!post) throw new AppError('Không tìm thấy bài viết', 404);
    res.json(post);
  } catch (err) { next(err); }
};
exports.create = (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) throw new AppError('Thiếu title hoặc content', 400);
    res.status(201).json(Post.create({ title, content, thumbnailUrl: req.file ? `/uploads/${req.file.filename}` : null }));
  } catch (err) { next(err); }
};
exports.remove = (req, res, next) => {
  try {
    const deleted = Post.deleteById(req.params.id);
    if (!deleted) throw new AppError('Không tìm thấy bài viết', 404);
    Comment.deleteByPostId(req.params.id);
    res.json({ message: 'Đã xóa bài viết và các bình luận liên quan' });
  } catch (err) { next(err); }
};
