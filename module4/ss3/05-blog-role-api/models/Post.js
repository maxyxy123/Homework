let posts = [{ id: 1, title: 'Bài viết đầu tiên', content: 'Xin chào!', thumbnailUrl: null }];
const getAll = () => posts;
const findById = id => posts.find(p => p.id === Number(id));
const create = data => {
  const post = { id: posts.reduce((m, p) => Math.max(m, p.id), 0) + 1, title: data.title, content: data.content, thumbnailUrl: data.thumbnailUrl || null };
  posts.push(post);
  return post;
};
const deleteById = id => {
  const index = posts.findIndex(p => p.id === Number(id));
  if (index === -1) return undefined;
  return posts.splice(index, 1)[0];
};
module.exports = { getAll, findById, create, deleteById };
