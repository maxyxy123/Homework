exports.up = knex => knex.schema.createTable('orders', table => {
 table.increments('id').primary();
 table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
 table.integer('total').notNullable(); table.timestamps(true, true);
});
exports.down = knex => knex.schema.dropTableIfExists('orders');
