const { performance } = require('node:perf_hooks');
const port = process.env.PORT || 3000;
(async () => {
 const results = [];
 let previous;
 for (const endpoint of ['slow','fast']) {
  const start = performance.now();
  const r = await fetch(`http://localhost:${port}/api/v1/report/${endpoint}`);
  const json = await r.json();
  if (!r.ok) throw new Error(JSON.stringify(json));
  results.push({ endpoint, queryCount:json.meta.queryCount, durationMs:json.meta.durationMs, clientMs:Math.round(performance.now()-start) });
  if (previous) {
   const normalize = data => data.map(c => ({id:c.id, name:c.name, products:c.Products.map(p=>({id:p.id,name:p.name,price:p.price,categoryId:p.categoryId}))}));
   console.log('Data giống nhau:', JSON.stringify(normalize(previous)) === JSON.stringify(normalize(json.data)));
  }
  previous = json.data;
 }
 console.table(results);
})().catch(e=>{console.error(e);process.exitCode=1});
