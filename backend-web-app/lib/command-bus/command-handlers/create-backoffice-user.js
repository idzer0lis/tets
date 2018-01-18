require('../../../node-environment');

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const _ = require('underscore');
const flashMessages = require('../../constants/flash-messages');

const logger = require('../../helpers/logger');
const usersRepo = require('../../repositories/users');
const siteUsersRepo = require('../../repositories/site-users');

const commander = require('..');

// const { roleCodes } = require('../../constants');

const RANDOM_ACTIVATION_CODE_LENGTH = 50;
const RANDOM_PASSWORD_LENGTH = 50;

function createRandomActivationCode(randomActivationCodeLength) {
  return crypto.randomBytes(randomActivationCodeLength).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
    .replace(/=/g, '');
}

async function createRandomPasswordAndHash(randomPasswordLength) {
  const randomPassword = await crypto.randomBytes(randomPasswordLength).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
    .replace(/=/g, '');
  const randomPasswordHash = await bcrypt.hash(randomPassword, bcrypt.genSaltSync(8), null);

  return { randomPassword, randomPasswordHash };
}

async function handle({}, { user }) {
  if (!user) {
    throw new Error('Missing payload');
  }

  const userExists = await usersRepo.getUserByEmail(user.email);

  if (userExists) {
    return Promise.resolve({
      state: false, type: 'danger', message: 'Provided email is already in use.',
    });
  }

  const siteUserExists = await siteUsersRepo.checkSiteUserExistenceByEmail(user.email);

  if (siteUserExists) {
    return Promise.resolve({
      state: false, type: 'danger', message: flashMessages.REGISTER_BACKOFFICE_EMAIL,
    });
  }

  // Snapshot the request body and prepare a password
  const { randomPasswordHash } = await createRandomPasswordAndHash(RANDOM_PASSWORD_LENGTH);
  const userData = Object.assign({
    password: randomPasswordHash,
    activation_code: createRandomActivationCode(RANDOM_ACTIVATION_CODE_LENGTH),
  }, _.omit(user, 'role'));

  userData.email = userData.email.toLowerCase();

  let userResult;
  try {
    userResult = await usersRepo.createUser(userData);
  } catch (err) {
    logger.error('Could not save user into database', err);

    return Promise.resolve({
      state: false,
      type: 'danger',
      message: 'Could not save user into database',
    });
  }
  if (!userResult || !userResult.user_id) {
    return Promise.resolve({
      state: false,
      type: 'danger',
      message: 'An unexpected error occurred saving the user',
    });
  }

  await usersRepo.assignRoleToUser(userResult.user_id, user.role);

  const userDetails = Object.assign({
    name: `${userResult.first_name} ${userResult.last_name}`,
    address: userResult.email.toLowerCase(),
    activationCode: userData.activation_code,
  });

  // We don't wait for this to happen and the outcome doesn't really interest us
  commander.handle(commander.commands.SEND_BACKOFFICE_USER_ACTIVATION_EMAIL, {}, { userDetails });

  return Promise.resolve({
    state: true, type: 'success', message: 'User saved!', new_user: userResult,
  });
}

module.exports = {
  handle,
};

/*

 Usage example:


 handle({}, {
 user: {
 first_name: `mother${new Date().getTime()}`,
 last_name: 'farmer',
 email: `wealllive+${new Date().getTime()}@inayellow.submarine`,
 role: roleCodes.ADMIN,
 },
 }).then(console.log).then(process.exit);


 */
