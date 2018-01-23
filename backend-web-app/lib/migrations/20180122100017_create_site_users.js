
exports.up = async function up(knex) {

  await knex.schema.createTable('site_user', (table) => {
    table.increments('site_user_id').unsigned().notNullable().primary();

    table.string('email', 150).notNullable();
    table.string('password').notNullable();

    table.string('activation_code', 100);
    table.string('password_reset_code', 100);

    table.string('email_change_confirmation_code', 100);
    table.string('email_change_new_address', 100);


    table.timestamp('activated_at').nullable();
    table.timestamp('password_reset_code_expires_at').nullable();
    table.timestamp('deactivated_at').nullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

    table.unique('email');
    table.unique('activation_code');
    table.unique('password_reset_code');
    table.unique('email_change_confirmation_code');

    table.boolean('activated').notNullable().default(false);

  });

};

exports.down = async function down(knex) {

  await knex.schema.dropTable('site_user');

};
