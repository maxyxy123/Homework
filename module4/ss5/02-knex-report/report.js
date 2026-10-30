require('dotenv').config();
const knex = require('knex')(require('./knexfile').development);
(async () => {
 try {
  const query = knex('users')
   .leftJoin('orders', 'users.id', 'orders.user_id')
   .select('users.name')
   .select(knex.raw('COUNT(orders.id) AS orderCount'))
   .select(knex.raw('COALESCE(SUM(orders.total), 0) AS totalSpent'))
   .groupBy('users.id', 'users.name')
   .havingRaw('COUNT(orders.id) >= ?', [2])
   .orderBy('totalSpent', 'desc')
   .limit(3);
  console.log('SQL:', query.toString());
  console.table(await query);
 } finally { await knex.destroy(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
