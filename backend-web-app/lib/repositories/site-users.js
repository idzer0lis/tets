const _ = require('underscore');

/* We want to disable camelCase here since we're dealing with database field names and those are snake_cased.
 * By disabling camelCase, we can directly map function parameters to database structures for easier insert/update. */
/* eslint camelcase: ["off"] */

/* Have a module header available for easy reference */
/* eslint-disable no-use-before-define */
module.exports = {
  activateSiteUserByActivationCode,
  activateSiteUserById,
  assignActivationCode,
  checkSiteUserExistenceByEmail,
  createSiteUser,
  deactivateSiteUserById,
  findActivationCode,
  getPagedSiteUsers,
  getSiteUserById,
  getSiteUserByEmail,
  getSiteUserByPasswordResetCode,
  getSiteUserDetailsById,
  setSiteUserPasswordResetCode,
};
/* eslint-enable no-use-before-define */

const { performQueries, applyPagination, extractQueryFilters } = require('./_toolbelt');

const knex = require('../db');

function activateSiteUserByActivationCode(activation_code) {
  return knex('site_user')
    .where({ activation_code })
    .update({
      activation_code: null,
      activated_at: knex.raw('now()'),
    })
    .returning('*')
    .then(([site_user]) => (site_user ? _.omit(site_user, 'password') : null));
}

function activateSiteUserById(site_user_id) {
  return knex('site_user')
    .where({ site_user_id })
    .update({
      activation_code: null,
      activated_at: knex.raw('now()'),
      activated: true,
      deactivated_at: null,
    })
    .returning('*')
    .then(([site_user]) => (site_user ? _.omit(site_user, 'password') : null));
}

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

function createSiteUser(siteUserData) {
  const allowedFields = [
    'email',
    'activation_code',
    'password',
  ];

  if (siteUserData.email) {
    // eslint-disable-next-line no-param-reassign
    siteUserData.email = siteUserData.email.toLowerCase();
  }

  return knex.returning('*')
    .insert(_.pick(siteUserData, allowedFields)).into('site_user')
    .then(([site_user]) => _.omit(site_user, 'password'))
    .then(function(site_user) {
      insert(site_user.site_user_details_id, 'site_user_details').into('site_user_details');
    })
    .then(function () {
      insert(siteUserData.etherium_address, 'etherium_address').into('site_users_details');
    });
}

function deactivateSiteUserById(site_user_id) {
  return knex('site_user')
    .where({ site_user_id })
    .update({
      activated_at: null,
      activated: false,
      deactivated_at: knex.raw('now()'),
    })
    .returning('*')
    .then(([site_user]) => (site_user ? _.omit(site_user, 'password') : null));
}

function findActivationCode(activation_code) {
  return knex('site_user').where({ activation_code }).first();
}

function getPagedSiteUsers(dataTable) {
  return performQueries(
    applyPagination(
      dataTable,
      extractQueryFilters(
        dataTable,
        knex('site_user'),
        ['email'],
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

function getSiteUserByPasswordResetCode(passwordResetCode) {
  return knex('site_user').where({ password_reset_code: passwordResetCode }).first();
}

function getSiteUserDetailsById(site_user_id) {
  return knex('site_user_details')
    .innerJoin('site_user', 'site_user.site_user_details_id', 'site_user_details.site_user_details_id')
    .where('site_user.site_user_id', site_user_id)
    .first('site_user_details.*');
}


function setSiteUserPasswordResetCode(email, resetPasswordCode) {
  // eslint-disable-next-line no-param-reassign
  email = email.toLowerCase();

  return knex('site_user')
    .where({ email })
    .update({
      password_reset_code: resetPasswordCode,
      password_reset_code_expires_at: knex.raw("now() + interval '1 hour'"),
    })
    .returning('*')
    .then(([site_user]) => (site_user ? _.omit(site_user, 'password') : null));
}
