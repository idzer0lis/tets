
exports.up = async function up(knex) {
  // activated column is already present
};

exports.down = async function down(knex) {
  await knex('site_user')
    .whereNotNull('activated_at')
    .update({ activated: false });

  await knex.schema.table('site_user', (table) => {
    table.dropColumn('activated');
  });
};
