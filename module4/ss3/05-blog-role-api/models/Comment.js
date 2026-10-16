let comments = [{ id: 1, postId: 1, content: 'Bài viết hay!' }];
const create = data => {
  const comment = { id: comments.reduce((m, c) => Math.max(m, c.id), 0) + 1, postId: Number(data.postId), content: data.content };
  comments.push(comment);
  return comment;
};
const findByPostId = postId => comments.filter(c => c.postId === Number(postId));
const deleteByPostId = postId => {
  const removed = findByPostId(postId);
  comments = comments.filter(c => c.postId !== Number(postId));
  return removed;
};
module.exports = { create, findByPostId, deleteByPostId };
