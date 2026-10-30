const base = 'http://localhost:' + (process.env.PORT || 3000);
(async () => {
 for (const [name, items] of [
  ['Thành công', [{ productId: 1, qty: 2 }, { productId: 5, qty: 1 }]],
  ['Thiếu stock', [{ productId: 1, qty: 1 }, { productId: 8, qty: 1 }]],
 ]) {
  const r = await fetch(base + '/api/v1/orders', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({items}) });
  console.log(name, r.status, await r.json());
 }
})().catch(e => { console.error(e);process.exitCode=1 });
