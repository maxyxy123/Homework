exports.up = knex => knex.schema.createTable('users', table => {
 table.increments('id').primary(); table.string('name', 100).notNullable();
 table.string('email', 255).notNullable().unique();
 table.timestamps(true, true);
});
exports.down = knex => knex.schema.dropTableIfExists('users');
