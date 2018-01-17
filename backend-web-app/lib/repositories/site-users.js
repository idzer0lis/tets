const _ = require('underscore');

/* We want to disable camelCase here since we're dealing with database field names and those are snake_cased.
 * By disabling camelCase, we can directly map function parameters to database structures for easier insert/update. */
/* eslint camelcase: ["off"] */

/* Have a module header available for easy reference */
/* eslint-disable no-use-before-define */
module.exports = {
  getTx: () => knex.transaction,
  getSiteUserById,
  getSiteUserByIdWithPassword,
  getSiteUserByEmail,
  getSiteUserByPasswordResetCode,
  changeSiteUserPassword,
  changeSiteUserPasswordById,
  setSiteUserPasswordResetCode,
  activateSiteUserByActivationCode,
  activateSiteUserById,
  deactivateSiteUserById,
  createSiteUser,
  checkIfDocumentBundleIsUniqueEnough,
  checkIfIcoContributionAddressIsInUse,
  validateSiteUserById,
  rejectSiteUserById,
  assignActivationCode,
  updateSiteUserKycContributionAddress,
  updateSiteUserEmail,
  insertSiteUserDetails,
  updateSiteUserDetailsIdOnSiteUser,
  getSiteUserDetailsById,
  findActivationCode,
};
/* eslint-enable no-use-before-define */


const knex = require('../db');

function getSiteUserById(id) {
  return knex('site_users')
    .leftJoin('site_user_details', 'site_user_details.site_user_id', 'site_users.site_user_id')
    .where({ 'site_users.site_user_id': id })
    .orderBy('site_user_details.updated_at', 'desc')
    .first(
      'site_users.*',
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

function getSiteUserByIdWithPassword(id) {
  return knex('site_users').where({ site_user_id: id }).first();
}

function getSiteUserByEmail(email) {
  // eslint-disable-next-line no-param-reassign
  email = email.toLowerCase();
  return knex('site_users')
    .where({ email })
    .first();
}

function getSiteUserDetailsById(site_user_id) {
  return knex('site_user_details')
    .innerJoin('site_users', 'site_users.site_user_details_id', 'site_user_details.site_user_details_id')
    .where('site_users.site_user_id', site_user_id)
    .first('site_user_details.*');
}

function getSiteUserByPasswordResetCode(passwordResetCode) {
  return knex('site_users').where({ password_reset_code: passwordResetCode }).first();
}

function changeSiteUserPassword(passwordResetCode, password) {
  return knex('site_users')
    .where({ password_reset_code: passwordResetCode })
    .update({
      password,
      password_reset_code: null,
      password_reset_code_expires_at: null,
    })
    .returning('*')
    .then(([site_user]) => (site_user ? _.omit(site_user, 'password') : null));
}

function changeSiteUserPasswordById(site_user_id, password) {
  return knex('site_users')
    .where({ site_user_id })
    .update({
      password,
      updated_at: knex.raw('now()'),
    })
    .returning('*')
    .then(([site_user]) => (site_user ? _.omit(site_user, 'password') : null));
}

function setSiteUserPasswordResetCode(email, resetPasswordCode) {
  // eslint-disable-next-line no-param-reassign
  email = email.toLowerCase();

  return knex('site_users')
    .where({ email })
    .update({
      password_reset_code: resetPasswordCode,
      password_reset_code_expires_at: knex.raw("now() + interval '1 hour'"),
    })
    .returning('*')
    .then(([site_user]) => (site_user ? _.omit(site_user, 'password') : null));
}

function activateSiteUserByActivationCode(activation_code) {
  return knex('site_users')
    .where({ activation_code })
    .update({
      activation_code: null,
      activated_at: knex.raw('now()'),
    })
    .returning('*')
    .then(([site_user]) => (site_user ? _.omit(site_user, 'password') : null));
}

function activateSiteUserById(site_user_id) {
  return knex('site_users')
    .where({ site_user_id })
    .update({
      activation_code: null,
      activated_at: knex.raw('now()'),
      deactivated_at: null,
    })
    .returning('*')
    .then(([site_user]) => (site_user ? _.omit(site_user, 'password') : null));
}

function deactivateSiteUserById(site_user_id) {
  return knex('site_users')
    .where({ site_user_id })
    .update({
      activated_at: null,
      deactivated_at: knex.raw('now()'),
    })
    .returning('*')
    .then(([site_user]) => (site_user ? _.omit(site_user, 'password') : null));
}

function createSiteUser(siteUserData) {
  const allowedFields = [
    'email',
    'activation_code',
    'unique_site_user_tracking_id',
    'password',
  ];

  if (siteUserData.email) {
    // eslint-disable-next-line no-param-reassign
    siteUserData.email = siteUserData.email.toLowerCase();
  }

  return knex.returning('*').insert(_.pick(siteUserData, allowedFields)).into('site_users').then(([site_user]) => _.omit(site_user, 'password'));
}

/**
 * We check if the bundle is unique from the
 * (country of residence, identity document type, identity document number )
 * perspective
 */
function checkIfDocumentBundleIsUniqueEnough(
  site_user_id,
  country_of_residence,
  identity_document_type,
  identity_document_number,
  tx,
) {
  const simplified_identity_document_number = (identity_document_number || '').replace(/[^a-zA-Z0-9\-_]/g, '');

  let q = knex('site_user_kyc_bundles')
    .whereRaw(`kyc_bundle_payload #>> '{country_of_residence}' = ?
  AND kyc_bundle_payload #>> '{identity_document_type}' = ?
  AND (kyc_bundle_payload #>> '{simplified_identity_document_number}' = ?
  OR kyc_bundle_payload #>> '{identity_document_number}' = ?)
  AND site_user_id <> ?`, [
        country_of_residence,
        identity_document_type,
        simplified_identity_document_number,
        identity_document_number,
        site_user_id,
      ]);

  if (tx) {
    q = q.transacting(tx);
  }

  return q.first().then((found) => !found);
}

function checkIfIcoContributionAddressIsInUse(site_user_id, contribution_source_address, tx) {
  // FORCE the address to be lowercase
  // eslint-disable-next-line no-param-reassign
  contribution_source_address = contribution_source_address.toLowerCase();

  let q = knex('gbx_ico_contribution_addresses')
    .where(knex.raw('lower(contribution_source_address) = lower(?)', [contribution_source_address]))
    .andWhere('site_user_id', '<>', site_user_id)
    .first();

  if (tx) {
    q = q.transacting(tx);
  }

  return q.then((found) => !!found);
}

function validateSiteUserById(site_user_id, tx) {
  let q = knex('site_users')
    .where({ site_user_id })
    .update({ identity_verification_status_code: 'VERIFIED' })
    .returning('*');

  if (tx) {
    q = q.transacting(tx);
  }

  return q;
}

function rejectSiteUserById(site_user_id) {
  return knex('site_users')
    .where({ site_user_id })
    .update({ identity_verification_status_code: 'REJECTED' })
    .returning('*');
}

function assignActivationCode(site_user_id, activationCode) {
  return knex('site_users')
    .where({ site_user_id })
    .update({
      activation_code: activationCode,
      deactivated_at: null,
    })
    .then((site_user) => _.omit(site_user, 'password'));
}

function updateSiteUserKycContributionAddress(site_user_id, contribution_source_address) {
  return knex('gbx_ico_contribution_addresses')
    .where({ site_user_id })
    .update(knex.raw('contribution_source_address = lower(?)', [contribution_source_address]))
    .returning('*');
}

function updateSiteUserEmail(email, new_email, activation_code) {
  // eslint-disable-next-line no-param-reassign
  email = email.toLowerCase();
  // eslint-disable-next-line no-param-reassign
  new_email = new_email.toLowerCase();

  return knex('site_users')
    .whereRaw('lower(email) = lower(?)', [email])
    .update({
      email: new_email,
      activated_at: null,
      activation_code,
    })
    .returning('*')
    .then(([site_user]) => _.omit(site_user, 'password'));
}

function insertSiteUserDetails(user_details, tx) {
  let q = knex.insert(user_details)
    .into('site_user_details')
    .returning('*');

  if (tx) {
    q = q.transacting(tx);
  }

  return q;
}

function updateSiteUserDetailsIdOnSiteUser(site_user_id, site_user_details_id, tx) {
  let q = knex('site_users')
    .where({ site_user_id })
    .update({ site_user_details_id })
    .returning('*');

  if (tx) {
    q = q.transacting(tx);
  }

  return q;
}

function findActivationCode(activation_code) {
  return knex('site_users').where({ activation_code }).first();
}
