
exports.up = async function up(knex) {
  await knex.schema.createTable('site_user_details', (table) => {
    table.increments('site_user_details_id').unsigned().notNullable().primary();

    table.integer('site_user_id').unsigned().notNullable();

    table.string('first_name', 100);
    table.string('last_name', 100);
    table.string('gender', 1);
    table.string('nationality', 100);
    table.string('country_of_residence', 100);
    table.string('home_address', 250);
    table.date('date_of_birth');
    table.string('identity_document_type', 50);
    table.string('identity_document_number', 50);

    table.string('etherium_address', 150);
    table.unique('etherium_address');

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

    table.integer('updated_by_user_id').unsigned();

    table.foreign('site_user_id').references('site_user.site_user_id');
    table.foreign('updated_by_user_id').references('user.user_id');
  });

  await knex.schema.table('site_user', (table) => {
    table.integer('site_user_details_id').unsigned().nullable();

    table.foreign('site_user_details_id')
      .references('site_user_details.site_user_details_id')
      .onDelete('SET NULL');
  });
};

exports.down = async function down(knex) {
  await knex.schema.table('site_user', (table) => {
    table.dropColumn('site_user_details_id');
  });

  await knex.schema.dropTable('site_user_details');
};
