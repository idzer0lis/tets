
exports.up = async function up(knex) {
  await knex.schema.createTable('user', (table) => {
    table.increments('user_id').unsigned().notNullable().primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('company_name');
    table.timestamp('join_date').notNullable().defaultTo(knex.fn.now());

    table.unique('email');
  });

  await knex.schema.createTable('role', (table) => {
    table.string('role_code', 50).notNullable().primary();
    table.string('description').notNullable();

    table.unique('role_code');
  });

  await knex.schema.createTable('permission', (table) => {
    table.string('permission_code', 100).notNullable().primary();
    table.string('description').notNullable();

    table.unique('permission_code');
  });

  await knex.schema.createTable('role_permission', (table) => {
    table.string('role_code', 50).notNullable();
    table.string('permission_code', 100).notNullable();

    table.foreign('role_code').references('role.role_code');
    table.foreign('permission_code').references('permission.permission_code');

    table.primary(['role_code', 'permission_code']);
  });

  await knex.schema.createTable('user_role', (table) => {
    table.integer('user_id').unsigned().notNullable();
    table.string('role_code', 50).notNullable();

    table.foreign('user_id').references('user.user_id');
    table.foreign('role_code').references('role.role_code');
    table.unique(['user_id', 'role_code']);

    table.primary(['user_id', 'role_code']);
  });

  await knex.schema.createTable('remember_me_cookie', (table) => {
    table.string('cookie').notNullable();
    table.timestamp('creation_date').defaultTo(knex.fn.now());
    table.timestamp('expiration_date').defaultTo(knex.fn.now()).notNullable();
    table.integer('user_id').unsigned().notNullable();

    table.foreign('user_id').references('user.user_id');
    table.unique('cookie');
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('remember_me_cookie');
  await knex.schema.dropTable('user_role');
  await knex.schema.dropTable('role_permission');
  await knex.schema.dropTable('permission');
  await knex.schema.dropTable('role');
  await knex.schema.dropTable('user');
};
