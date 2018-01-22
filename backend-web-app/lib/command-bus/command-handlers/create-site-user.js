require('../../../node-environment');

const bcrypt = require('bcrypt');
const crypto = require('crypto');

const logger = require('../../helpers/logger');
const siteUsersRepo = require('../../repositories/site-users');
const usersRepo = require('../../repositories/users');
const flashMessages = require('../../constants/flash-messages');

const commander = require('..');

const _ = require('underscore');
const uuidv4 = require('uuid/v4');

const RANDOM_ACTIVATION_CODE_LENGTH = 50;

function createRandomActivationCode(randomActivationCodeLength) {
  return crypto.randomBytes(randomActivationCodeLength).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
    .replace(/=/g, '');
}

async function handle({}, { user }) {
  if (!user) {
    throw new Error('Missing payload');
  }

  const backofficeUser = await usersRepo.getUserByEmail(user.email);
  if (backofficeUser) {
    return Promise.resolve({
      state: false,
      type: 'danger',
      message: flashMessages.REGISTER_BACKOFFICE_EMAIL,
    });
  }

  const existingUser = await siteUsersRepo.getSiteUserByEmail(user.email);
  if (existingUser) {
    if (existingUser.deactivated_at) {
      return Promise.resolve({
        state: false,
        type: 'danger',
        message: flashMessages.LOGIN_ACCOUNT_DEACTIVATED,
      });
    }
    return Promise.resolve({
      state: false,
      type: 'danger',
      message: flashMessages.REGISTER_DUPLICATE_EMAIL,
    });
  }

  const generateHash = await bcrypt.hash(user.password, bcrypt.genSaltSync(8), null);

  const siteUserData = Object.assign(_.omit(user, 'confirm_password', 'gRecaptchaResponse'), {
    activation_code: createRandomActivationCode(RANDOM_ACTIVATION_CODE_LENGTH),
    unique_site_user_tracking_id: uuidv4(),
    password: generateHash,
    etherium_address: user.etherium_address
  });

  siteUserData.email = siteUserData.email.toLowerCase();

  const siteUserResult = await siteUsersRepo.createSiteUser(siteUserData)
    .catch((err) => {
      logger.error('Could not save user into database', err);
      return Promise.reject(err);
    });

  if (!siteUserResult || !siteUserResult.site_user_id) {
    return Promise.resolve({
      state: false,
      type: 'danger',
      message: 'An unexpected error occurred saving the user',
    });
  }

  const userDetails = Object.assign({
    address: user.email.toLowerCase(),
    activation_code: siteUserData.activation_code,
  });

  // We don't wait for this to happen and the outcome doesn't really interest us
  commander.handle(commander.commands.SEND_SITE_USER_ACTIVATION_EMAIL, {}, { userDetails });

  return Promise.resolve({
    state: true, type: 'success', message: flashMessages.REGISTER_SUCCESS, new_site_user: siteUserResult,
  });
}

module.exports = {
  handle,
};

/*

 Usage example:

 handle({}, {
 user: {
 email: `wealllive+${new Date().getTime()}@inayellow.submarine`,
 password: 'pwd',
 },
 }).then(console.log).then(process.exit);

 */
