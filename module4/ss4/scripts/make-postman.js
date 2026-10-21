const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..', 'postman');
const tests = (status, assertions) => [
  `pm.test("Status code là ${status}", () => { pm.response.to.have.status(${status}); });`,
  `pm.test("Response đúng cấu trúc đã thiết kế", () => { const json = pm.response.json(); ${assertions} });`
];
const requests = [
  ['01 - Orders có status và limit', '/api/v1/users/2/orders?status=paid&limit=3', 200, "pm.expect(json).to.have.property('success', true); pm.expect(json.data).to.be.an('array'); pm.expect(json.data.length).to.eql(2); pm.expect(json.data.every(o => o.status === 'paid' && o.userId === 2)).to.be.true; pm.expect(json.meta.total).to.eql(2);"],
  ['02 - Orders mặc định', '/api/v1/users/2/orders', 200, "pm.expect(json).to.have.property('success', true); pm.expect(json.data).to.be.an('array'); pm.expect(json.meta.total).to.eql(4);"],
  ['03 - User không tồn tại (404)', '/api/v1/users/999/orders', 404, "pm.expect(json).to.have.property('success', false); pm.expect(json.code).to.eql('USER_NOT_FOUND');"],
  ['04 - Order pending có link cancel', '/api/v2/orders/17', 200, "pm.expect(json).to.have.property('success', true); pm.expect(json.data).to.have.property('status', 'pending'); pm.expect(json.data._links).to.have.property('cancel');"],
  ['05 - Order cancelled không có cancel', '/api/v2/orders/15', 200, "pm.expect(json).to.have.property('success', true); pm.expect(json.data).to.have.property('status', 'cancelled'); pm.expect(json.data._links).not.to.have.property('cancel');"]
];
const collection = {
  info: { name: 'REST API - Nested Resources & HATEOAS', description: '5 requests, moi request co 2 tests. Request 03 dung status 404 theo dung ky vong.', schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json' },
  item: requests.map(([name, uri, status, assert]) => ({
    name,
    request: { method: 'GET', header: [], url: { raw: `{{base_url}}${uri}`, host: ['{{base_url}}'], path: uri.split('?')[0].split('/').filter(Boolean), ...(uri.includes('?') ? { query: uri.split('?')[1].split('&').map(kv => { const [key, value] = kv.split('='); return { key, value }; }) } : {}) } },
    event: [{ listen: 'test', script: { type: 'text/javascript', exec: tests(status, assert) } }]
  }))
};
const env = { name: 'REST API Local', values: [{ key: 'base_url', value: 'http://localhost:3000', enabled: true, type: 'default' }], _postman_variable_scope: 'environment' };
fs.writeFileSync(path.join(root, 'collection.json'), JSON.stringify(collection, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'env.json'), JSON.stringify(env, null, 2) + '\n');
