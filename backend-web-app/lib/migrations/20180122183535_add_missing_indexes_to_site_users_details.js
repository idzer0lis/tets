
exports.up = async function (knex) {
  await knex.schema.table('site_user', (table) => {
    table.index('site_user_id');
  });

  await knex.schema.table('site_user_details', (table) => {
    table.index('site_user_details_id');
  });
};

exports.down = async function (knex) {
  await knex.schema.table('site_user', (table) => {
    table.dropIndex('site_user_id');
  });

  await knex.schema.table('site_user_details', (table) => {
    table.dropIndex('site_user_details_id');
  });
};
