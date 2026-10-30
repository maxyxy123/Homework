exports.seed = async knex => {
 await knex('orders').del(); await knex('users').del();
 await knex('users').insert([
  { id: 1, name: 'An', email: 'an@example.com' },
  { id: 2, name: 'Binh', email: 'binh@example.com' },
  { id: 3, name: 'Chi', email: 'chi@example.com' },
  { id: 4, name: 'Dung', email: 'dung@example.com' },
  { id: 5, name: 'Em', email: 'em@example.com' },
 ]);
 const totals = { 1: [100, 200, 300, 400], 2: [250, 350, 400], 3: [80, 100, 120], 4: [500, 600], 5: [20, 30, 40] };
 const orders = Object.entries(totals).flatMap(([id, list]) => list.map(total => ({ user_id: Number(id), total })));
 await knex('orders').insert(orders); // 15 orders
};
