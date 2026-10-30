const base = 'http://localhost:' + (process.env.PORT || 3000);
const cases = [
  ['/api/v1/products?page=2&limit=10&keyword=sach&sort=price_asc', 'đủ tham số'],
  ['/api/v1/products?keyword=sach', 'chỉ keyword'],
  ['/api/v1/products?sort=price_desc', 'chỉ sort'],
  ['/api/v1/products', 'không tham số'],
];
(async () => {
  const result = [];
  for (const [path, name] of cases) {
    const response = await fetch(base + path);
    const json = await response.json();
    const ok = response.ok && json.success === true && Array.isArray(json.data) && json.meta?.total >= 0;
    result.push({ test: name, status: response.status, result: ok ? 'PASS' : 'FAIL', meta: json.meta });
  }
  console.table(result);
  if (result.some(r => r.result !== 'PASS')) process.exitCode = 1;
})().catch(e => { console.error('Hãy chạy npm start trước:', e.message); process.exitCode = 1; });
