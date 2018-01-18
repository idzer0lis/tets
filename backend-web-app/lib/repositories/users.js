/**
 * Created by sandrastoicescu on 24/11/2017.
 */

const _ = require('underscore');

/* We want to disable camelCase here since we're dealing with database field names and those are snake_cased.
 * By disabling camelCase, we can directly map function parameters to database structures for easier insert/update. */
/* eslint camelcase: ["off"] */

/* Have a module header available for easy reference */
/* eslint-disable no-use-before-define */
module.exports = {
  activateUserByActivationCode,
  assignRoleToUser,
  changeUserPassword,
  changeUserPasswordById,
  createUser,
  deleteAllRememberMeCookiesByUserId,
  deleteRememberMeCookieByUserId,
  findUserActivationCode,
  getPagedUsersWithRoles,
  getRoles,
  getUserByActivationCode,
  getUserByEmail,
  getUserById,
  getUserByPasswordResetCode,
  getUserIdByToken,
  getUserWithRoles,
  setCookie,
  setUserPasswordResetCode,
};
/* eslint-enable no-use-before-define */

const { performQueries, applyPagination, extractQueryFilters } = require('./_toolbelt');

const moment = require('moment');
const knex = require('../db');

function getPagedUsersWithRoles(dataTable) {
  return performQueries(
    applyPagination(
      dataTable,
      extractQueryFilters(
        dataTable,
        knex('user')
          .join('user_role', 'user_role.user_id', 'user.user_id')
          .join('role', 'user_role.role_code', 'role.role_code'),
        ['user.first_name', 'user.last_name', 'user.email', 'user.company_name', 'user_role.role_code', 'role.description'],
      ),
    ),
    [
      'user.user_id',
      'user.first_name',
      'user.last_name',
      'user.company_name',
      'user.email',
      'user.activated_at',
      'role.role_code',
      'role.description AS role_description',
    ],
  );
}

function getUserById(id) {
  return knex('user').where({ user_id: id }).first().then((user) => _.omit(user, 'password'));
}

function getUserWithRoles(id) {
  return getUserById(id)
    .then((user) => {
      if (!user) {
        return Promise.resolve(user);
      }

      return knex('role')
        .join('user_role', 'role.role_code', 'user_role.role_code')
        .join('role_permission', 'user_role.role_code', 'role_permission.role_code')
        .join('permission', 'role_permission.permission_code', 'permission.permission_code')
        .where('user_role.user_id', user.user_id)
        .select(
          'role.role_code',
          'permission.permission_code',
        )
        .then((results) => {
          const seenRoles = {};
          const seenPermissions = {};

          return Object.assign(user, results.reduce((acc, record) => {
            if (!seenRoles[record.role_code]) {
              acc.roles.push(record.role_code);
              seenRoles[record.role_code] = true;
            }

            if (!seenPermissions[record.permission_code]) {
              acc.permissions.push(record.permission_code);
              seenPermissions[record.permission_code] = true;
            }

            return acc;
          }, {
            roles: [],
            permissions: [],
          }));
        });
    });
}

function getUserByEmail(email) {
  // eslint-disable-next-line no-param-reassign
  email = email.toLowerCase();
  return knex('user').whereRaw('lower(email) = lower(?)', [email]).first();
}

function getUserByPasswordResetCode(passwordResetCode) {
  return knex('user').where({ password_reset_code: passwordResetCode }).first();
}

function getUserIdByToken(rememberMe) {
  return knex('remember_me_cookie')
    .where('cookie', rememberMe)
    .andWhere('expiration_date', '>', moment().format('YYYY-MM-DD'))
    .first('user_id');
}

function changeUserPassword(passwordResetCode, password) {
  return knex('user')
    .where({ password_reset_code: passwordResetCode })
    .update({
      password,
      password_reset_code: null,
      password_reset_code_expires_at: null,
    })
    .returning('*')
    .then(([user]) => (user ? _.omit(user, 'password') : null));
}

function setUserPasswordResetCode(email, resetPasswordCode) {
  // eslint-disable-next-line no-param-reassign
  email = email.toLowerCase();

  return knex('user')
    .whereRaw('lower(email) = lower(?)', [email])
    .update({
      password_reset_code: resetPasswordCode,
      password_reset_code_expires_at: knex.raw("now() + interval '1 hour'"),
    })
    .returning('*')
    .then(([user]) => (user ? _.omit(user, 'password') : null));
}

function activateUserByActivationCode(activation_code, password) {
  return knex('user')
    .where({ activation_code })
    .update({
      password,
      activation_code: null,
      activated_at: knex.raw('now()'),
    })
    .returning('*')
    .then(([user]) => (user ? _.omit(user, 'password') : null));
}

/**
 * Assigns a given role code to an user
 * @param user_id Number user ID
 * @param role_code String role code
 */
function assignRoleToUser(user_id, role_code) {
  return knex.insert({ user_id, role_code }).into('user_role');
}

function createUser(userData) {
  if (userData.email) {
    // eslint-disable-next-line no-param-reassign
    userData.email = userData.email.toLowerCase();
  }

  return knex.returning('*').insert(userData).into('user').debug()
    .then(([user]) => _.omit(user, 'password'));
}

function setCookie(user_id, cookie) {
  return knex('remember_me_cookie')
    .insert({
      user_id,
      cookie,
      expiration_date: moment().add(7, 'days').format('YYYY-MM-DD HH:mm:ss'),
    });
}

/**
 * Deletes a specific remember-me cookie for the user (when logging off from a specific device)
 * @param user_id Number the user ID
 * @param cookie String the cookie to delete
 */
function deleteRememberMeCookieByUserId(user_id, cookie) {
  return knex('remember_me_cookie')
    .where({ user_id, cookie })
    .del();
}

/**
 * Deletes all remember-me cookies for the user (regardless of device)
 * @param user_id Number the user ID
 */
function deleteAllRememberMeCookiesByUserId(user_id) {
  return knex('remember_me_cookies')
    .where({ user_id })
    .del();
}

function findUserActivationCode(activation_code) {
  return knex('user').select('activation_code').where({ activation_code }).first();
}

function getRoles() {
  return knex('role').select('*');
}

function getUserByActivationCode(activation_code) {
  return knex('user')
    .where({ activation_code })
    .select('*')
    .then(([user]) => _.omit(user, 'password'));
}

function changeUserPasswordById(user_id, password) {
  return knex('user')
    .where({ user_id })
    .update({ password });
}
