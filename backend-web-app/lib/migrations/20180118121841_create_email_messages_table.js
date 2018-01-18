
exports.up = async function up(knex) {
  await knex.schema.createTable('email_message', (table) => {
    table.increments('email_message_id').unsigned().notNullable().primary();
    table.uuid('group_tracking_id', 50).notNullable();
    table.uuid('email_tracking_id', 50).notNullable();

    table.string('template_name', 100).notNullable();
    table.json('message_header').notNullable();
    table.json('message_contents').notNullable();
    table.json('message_locals').notNullable();

    table.integer('send_retries').notNullable().defaultTo(0);

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('sent_at').nullable();
    table.timestamp('gave_up_at').nullable();
    table.string('gave_up_reason', 100).nullable();

    table.unique('email_tracking_id');
    table.index('group_tracking_id');
    table.index('email_tracking_id');
    table.index('template_name');
    table.index('send_retries');
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTable('email_message');
};
