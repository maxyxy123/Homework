const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const product = require('../01-product-mvc/app');
const avatar = require('../02-avatar-upload/app');
const users = require('../03-user-errors/app');
const employees = require('../04-employee-api/app');
const blog = require('../05-blog-role-api/app');
test('Product MVC', async () => {
  assert.equal((await request(product).get('/api/products')).status, 200);
  const r = await request(product).post('/api/products').send({ name: 'Thước', price: 10000, quantity: 3 });
  assert.equal(r.status, 201);
  assert.ok(r.body.id);
});
test('User: 3 lỗi và 1 trường hợp đúng', async () => {
  assert.equal((await request(users).get('/users/999')).status, 404);
  assert.equal((await request(users).post('/users').send({})).status, 400);
  assert.equal((await request(users).get('/users/secret')).status, 401);
  assert.equal((await request(users).get('/users/1')).status, 200);
});
test('Avatar: chặn MIME không hợp lệ', async () => {
  const r = await request(avatar).post('/upload/avatar').attach('avatar', Buffer.from('hello'), { filename: 'a.pdf', contentType: 'application/pdf' });
  assert.equal(r.status, 400);
  assert.equal(r.body.message, 'Chỉ chấp nhận file ảnh JPEG/PNG/WEBP');
});
test('Employee: validate, duplicate, find', async () => {
  assert.equal((await request(employees).post('/api/employees').send({ name: 'An' })).status, 400);
  assert.equal((await request(employees).post('/api/employees').send({ name: 'Lan', email: 'lan@example.com' })).status, 409);
  assert.equal((await request(employees).get('/api/employees/999')).status, 404);
  assert.equal((await request(employees).get('/api/employees')).status, 200);
});
test('Blog: phân quyền và cascade', async () => {
  assert.equal((await request(blog).delete('/api/posts/1')).status, 401);
  assert.equal((await request(blog).delete('/api/posts/1').set('Authorization', 'user')).status, 403);
  assert.equal((await request(blog).post('/api/comments').set('Authorization', 'user').send({ postId: 999, content: 'x' })).status, 404);
  assert.equal((await request(blog).post('/api/comments').set('Authorization', 'user').send({ postId: 1, content: 'x' })).status, 201);
  assert.ok((await request(blog).get('/api/comments/post/1')).body.length >= 1);
  assert.equal((await request(blog).delete('/api/posts/1').set('Authorization', 'admin')).status, 200);
  assert.equal((await request(blog).get('/api/comments/post/1')).status, 404);
});
