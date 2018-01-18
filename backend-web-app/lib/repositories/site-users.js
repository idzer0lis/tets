// const _ = require('underscore');

/* We want to disable camelCase here since we're dealing with database field names and those are snake_cased.
 * By disabling camelCase, we can directly map function parameters to database structures for easier insert/update. */
/* eslint camelcase: ["off"] */

/* Have a module header available for easy reference */
/* eslint-disable no-use-before-define */
module.exports = {
  getSiteUserByEmail,
};
/* eslint-enable no-use-before-define */


const knex = require('../db');

function getSiteUserByEmail(email) {
  // eslint-disable-next-line no-param-reassign
  email = email.toLowerCase();
  return knex('site_user')
    .where({ email })
    .first()
    .then((outcome) => ((outcome && outcome.email && true) || false));
}
