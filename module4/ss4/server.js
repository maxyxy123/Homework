const http = require('node:http');
const users = require('./data/users');
const orders = require('./data/orders');
const books = require('./data/books');
const versionResolver = require('./middlewares/versionResolver');
const { sendJson } = require('./utils/http');
const { orderLinks } = require('./utils/links');

function app(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const path = url.pathname;
  if (req.method !== 'GET') {
    return sendJson(res, 405, { success: false, code: 'METHOD_NOT_ALLOWED' });
  }

  const nestedMatch = path.match(/^\/api\/v1\/users\/(\d+)\/orders\/?$/);
  if (nestedMatch) {
    const userId = Number(nestedMatch[1]);
    if (!users.some(user => user.id === userId)) {
      return sendJson(res, 404, { success: false, code: 'USER_NOT_FOUND', message: 'Khong tim thay user' });
    }
    const status = url.searchParams.get('status');
    if (status !== null && !['pending', 'paid', 'cancelled'].includes(status)) {
      return sendJson(res, 400, { success: false, code: 'INVALID_STATUS', message: 'status phai la pending, paid hoac cancelled' });
    }
    const rawLimit = url.searchParams.get('limit');
    if (rawLimit !== null && !/^[1-9]\d*$/.test(rawLimit)) {
      return sendJson(res, 400, { success: false, code: 'INVALID_LIMIT', message: 'limit phai la so nguyen duong' });
    }
    const limit = rawLimit === null ? 5 : Number(rawLimit);
    if (!Number.isSafeInteger(limit)) {
      return sendJson(res, 400, { success: false, code: 'INVALID_LIMIT' });
    }
    const filtered = orders.filter(order => order.userId === userId && (status === null || order.status === status));
    const data = filtered.slice(0, limit);
    return sendJson(res, 200, { success: true, data, meta: { total: data.length } });
  }

  if (path === '/api/books' || path === '/api/books/') {
    const version = versionResolver(req, res);
    if (!version) return;
    const data = books.map(book => version === 'v1'
      ? { id: book.id, title: book.title, author: book.author.name }
      : { id: book.id, title: book.title, author: { ...book.author }, publishedYear: book.publishedYear });
    return sendJson(res, 200, { success: true, data });
  }

  const orderMatch = path.match(/^\/api\/v2\/orders\/(\d+)\/?$/);
  if (orderMatch) {
    const order = orders.find(item => item.id === Number(orderMatch[1]));
    if (!order) return sendJson(res, 404, { success: false, code: 'ORDER_NOT_FOUND' });
    return sendJson(res, 200, { success: true, data: { ...order, _links: orderLinks(order) } });
  }

  const userMatch = path.match(/^\/api\/v2\/users\/(\d+)\/?$/);
  if (userMatch) {
    const user = users.find(item => item.id === Number(userMatch[1]));
    if (!user) return sendJson(res, 404, { success: false, code: 'USER_NOT_FOUND' });
    return sendJson(res, 200, { success: true, data: user });
  }

  return sendJson(res, 404, { success: false, code: 'ROUTE_NOT_FOUND' });
}

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  http.createServer(app).listen(port, () => console.log(`API dang chay: http://localhost:${port}`));
}
module.exports = app;
