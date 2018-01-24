
exports.up = async function up(knex) {
  await knex.schema.table('site_user', (table) => {
    table.dropColumn('activated');
  });
};

exports.down = async function down(knex) {
  await knex.schema.table('site_user', (table) => {
    table.boolean('activated').notNullable().default(false);
  });

  await knex('site_user')
    .whereNotNull('activated_at')
    .update({ activated: 1 });

  await knex('site_user')
    .whereNull('activated_at')
    .update({ activated: 0 });
};
