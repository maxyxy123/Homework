const Post = require('../models/Post');
const Comment = require('../models/Comment');
const AppError = require('../utils/AppError');
exports.create = (req, res, next) => {
  try {
    const { postId, content } = req.body;
    if (!postId || !content) throw new AppError('Thiếu postId hoặc content', 400);
    if (!Post.findById(postId)) throw new AppError('Không tìm thấy bài viết', 404);
    res.status(201).json(Comment.create({ postId, content }));
  } catch (err) { next(err); }
};
exports.getByPost = (req, res, next) => {
  try {
    if (!Post.findById(req.params.postId)) throw new AppError('Không tìm thấy bài viết', 404);
    res.json(Comment.findByPostId(req.params.postId));
  } catch (err) { next(err); }
};
