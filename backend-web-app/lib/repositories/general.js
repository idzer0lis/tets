/**
 * Created by sandrastoicescu on 24/11/2017.
 */
/* We want to disable camelCase here since we're dealing with database field names and those are snake_cased.
 * By disabling camelCase, we can directly map function parameters to database structures for easier insert/update. */
/* eslint-disable camelcase */

/* Have a module header available for easy reference */
/* eslint-disable no-use-before-define */

module.exports = {
  getRoles,
  getVerificationStatusCodes,
  getRolesWithoutTokenIssuer,
};
/* eslint-enable no-use-before-define */

const knex = require('../db');

function getRoles() {
  return knex('roles').select().returning('*').orderBy('description', 'asc');
}

function getRolesWithoutTokenIssuer() {
  return knex('roles')
    .select()
    .whereNot({ role_code: 'TOKEN_ISSUER' })
    .returning('*')
    .orderBy('description', 'asc');
}

function getVerificationStatusCodes() {
  return knex('site_user_identity_verification_status_codes').select().returning('*');
}
