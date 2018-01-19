const bcrypt = require('bcrypt');
const crypto = require('crypto');
const _ = require('underscore');
const commander = require('../command-bus');

const siteUsersRepo = require('../repositories/site-users');
const usersRepo = require('../repositories/users');

const flashMessages = require('../constants/flash-messages');

const RANDOM_ACTIVATION_CODE_LENGTH = 50;

function createRandomActivationCode(randomActivationCodeLength) {
  return crypto.randomBytes(randomActivationCodeLength).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
    .replace(/=/g, '');
}

const service = {
  checkUser: (email, password) => usersRepo.getUserByEmail(email)
    .then(async (user) => {
      if (!user) {
        return { state: false, type: 'error', message: 'Non-existent email.' };
      }

      if (!user.activated_at) {
        return { state: false, type: 'error', message: 'The account has not yet been activated.' };
      }

      return service.verifyPassword(password, user.password)
        .then((passwordCorrect) => {
          if (!passwordCorrect) {
            return {
              state: false, type: 'error', message: 'Incorrect password.',
            };
          }

          return usersRepo.getUserWithRoles(user.user_id).then((userWithRoles) => ({
            state: true, type: 'success', message: 'Successfully logged in!', user: userWithRoles,
          }));
        });
    }),

  checkFrontendUser: (email, password) => siteUsersRepo.getSiteUserByEmail(email)
    .then(async (user) => {
      if (!user) {
        return { state: false, type: 'error', message: flashMessages.LOGIN_NONEXISTENT_EMAIL };
      }

      if (!user.activated_at) {
        if (user.deactivated_at) {
          return { state: false, type: 'error', message: flashMessages.LOGIN_ACCOUNT_DEACTIVATED };
        }

        const activationCode = createRandomActivationCode(RANDOM_ACTIVATION_CODE_LENGTH);

        await siteUsersRepo.assignActivationCode(user.site_user_id, activationCode);

        const userDetails = Object.assign({
          address: user.email.toLowerCase(),
          activation_code: activationCode,
        });

        process.nextTick(() => commander.handle(commander.commands.SEND_SITE_USER_ACTIVATION_EMAIL, {}, { userDetails }));
        return { state: false, type: 'error', message: flashMessages.LOGIN_ACCOUNT_INACTIVE };
      }

      return service.verifyPassword(password, user.password)
        .then((passwordCorrect) => {
          if (!passwordCorrect) {
            return {
              state: false, type: 'error', message: flashMessages.LOGIN_PASSWORD_INCORRECT,
            };
          }

          return {
            state: true, type: 'success', message: 'Successfully logged in!', user: _.omit(user, 'password'),
          };
        });
    }),

  verifyPassword: (password, hash) => new Promise((resolve, reject) => bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      return reject(new Error(err));
    }
    return resolve(result);
  }))
    .then((result) => result),
};

module.exports = service;
