const _ = require('underscore');

/* We want to disable camelCase here since we're dealing with database field names and those are snake_cased.
 * By disabling camelCase, we can directly map function parameters to database structures for easier insert/update. */
/* eslint camelcase: ["off"] */

/* Have a module header available for easy reference */
/* eslint-disable no-use-before-define */
module.exports = {
  assignActivationCode,
  checkSiteUserExistenceByEmail,
  getPagedSiteUsers,
  getSiteUserByEmail,
  getSiteUserById,
  getSiteUserDetailsById,
};
/* eslint-enable no-use-before-define */

const { performQueries, applyPagination, extractQueryFilters } = require('./_toolbelt');

const knex = require('../db');

function assignActivationCode(site_user_id, activationCode) {
  return knex('site_user')
    .where({ site_user_id })
    .update({
      activation_code: activationCode,
      deactivated_at: null,
    })
    .then((site_user) => _.omit(site_user, 'password'));
}

function checkSiteUserExistenceByEmail(email) {
  // eslint-disable-next-line no-param-reassign
  email = email.toLowerCase();
  return knex('site_user')
    .where({ email })
    .first()
    .then((outcome) => ((outcome && outcome.email && true) || false));
}

function getPagedSiteUsers(dataTable) {
  return performQueries(
    applyPagination(
      dataTable,
      extractQueryFilters(
        dataTable,
        knex('site_user'),
        ['email', 'activated'],
      ),
    ),
    [
      'site_user_id',
      'email',
      'activated',
    ],
  );
}

function getSiteUserById(id) {
  return knex('site_user')
    .leftJoin('site_user_details', 'site_user_details.site_user_id', 'site_user.site_user_id')
    .where({ 'site_user.site_user_id': id })
    .orderBy('site_user_details.updated_at', 'desc')
    .first(
      'site_user.*',
      knex.raw('to_char(site_user_details.date_of_birth, \'YYYY-MM-DD\') AS date_of_birth'),
      'site_user_details.site_user_details_id',
      'site_user_details.first_name',
      'site_user_details.last_name',
      'site_user_details.gender',
      'site_user_details.nationality',
      'site_user_details.country_of_residence',
      'site_user_details.home_address',
      'site_user_details.identity_document_type',
      'site_user_details.identity_document_number',
    )
    .then((site_user) => _.omit(site_user, 'password'));
}

function getSiteUserByEmail(email) {
  // eslint-disable-next-line no-param-reassign
  email = email.toLowerCase();
  return knex('site_user')
    .where({ email })
    .first();
}

function getSiteUserDetailsById(site_user_id) {
  return knex('site_user_details')
    .innerJoin('site_user', 'site_user.site_user_details_id', 'site_user_details.site_user_details_id')
    .where('site_user.site_user_id', site_user_id)
    .first('site_user_details.*');
}
