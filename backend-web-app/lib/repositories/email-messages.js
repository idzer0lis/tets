/* We want to disable camelCase here since we're dealing with database field names and those are snake_cased.
 * By disabling camelCase, we can directly map function parameters to database structures for easier insert/update. */
/* eslint-disable camelcase */

/* Have a module header available for easy reference */
/* eslint-disable no-use-before-define */
module.exports = {
  insertEmailMessage,
  updateEmailMessage,
  getUnsentEmailMessages,
};
/* eslint-enable no-use-before-define */

const knex = require('../db');

async function insertEmailMessage(emailMessage) {
  const [savedEmailMessage] = await knex('email_messages')
    .insert(emailMessage)
    .returning('*');

  return savedEmailMessage;
}

async function updateEmailMessage(email_message_id, updatedFields) {
  const [savedEmailMessage] = await knex('email_messages')
    .returning('*')
    .where({ email_message_id })
    .update(updatedFields);

  return savedEmailMessage;
}

function getUnsentEmailMessages(limit = 10, retryLimit = 5) {
  return knex('email_messages')
    .whereNull('sent_at')
    .whereNull('gave_up_at')
    .where('send_retries', '<', retryLimit)
    .orderBy('created_at')
    .limit(limit)
    .select('*');
}
