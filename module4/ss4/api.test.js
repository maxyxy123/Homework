const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const app = require('./server');

async function withServer(fn) {
  const server = http.createServer(app);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try { await fn(`http://127.0.0.1:${server.address().port}`); }
  finally { await new Promise(resolve => server.close(resolve)); }
}

test('Nested resource: status + limit, defaults va user 404', async () => {
  await withServer(async base => {
    let res = await fetch(`${base}/api/v1/users/2/orders?status=paid&limit=3`);
    let json = await res.json();
    assert.equal(res.status, 200);
    assert.equal(json.data.length, 2);
    assert.deepEqual(json.data.map(o => o.id), [13, 18]);
    res = await fetch(`${base}/api/v1/users/2/orders`);
    json = await res.json();
    assert.equal(res.status, 200);
    assert.equal(json.meta.total, 4);
    res = await fetch(`${base}/api/v1/users/999/orders`);
    json = await res.json();
    assert.equal(res.status, 404);
    assert.equal(json.code, 'USER_NOT_FOUND');
  });
});
test('Header versioning v1/v2/v9', async () => {
  await withServer(async base => {
    let res = await fetch(`${base}/api/books`, { headers: { 'Api-Version': 'v1' } });
    let json = await res.json();
    assert.equal(res.headers.get('deprecation'), 'true');
    assert.equal(res.headers.get('sunset'), 'Wed, 31 Dec 2025 23:59:59 GMT');
    assert.equal(typeof json.data[0].author, 'string');
    res = await fetch(`${base}/api/books`, { headers: { 'Api-Version': 'v2' } });
    json = await res.json();
    assert.equal(typeof json.data[0].author, 'object');
    assert.equal(json.data[0].publishedYear, 2008);
    assert.equal(res.headers.get('deprecation'), null);
    res = await fetch(`${base}/api/books`, { headers: { 'Api-Version': 'v9' } });
    json = await res.json();
    assert.equal(res.status, 400);
    assert.equal(json.code, 'UNSUPPORTED_API_VERSION');
  });
});
test('HATEOAS: pending co cancel; cancelled khong co cancel', async () => {
  await withServer(async base => {
    let json = await (await fetch(`${base}/api/v2/orders/17`)).json();
    assert.equal(json.data._links.cancel.method, 'POST');
    json = await (await fetch(`${base}/api/v2/orders/15`)).json();
    assert.equal(Object.hasOwn(json.data._links, 'cancel'), false);
  });
});
