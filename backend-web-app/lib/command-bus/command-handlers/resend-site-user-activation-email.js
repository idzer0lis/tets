const siteUsersRepo = require('../../repositories/site-users');
const crypto = require('crypto');
const commander = require('../../command-bus');

const RANDOM_ACTIVATION_CODE_LENGTH = 50;

function createRandomActivationCode(randomActivationCodeLength) {
  return crypto.randomBytes(randomActivationCodeLength).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
    .replace(/=/g, '');
}

async function handle({}, { siteUserId }) {
  if (!siteUserId) {
    throw new Error('Missing user ID on payload');
  }

  const activationCode = createRandomActivationCode(RANDOM_ACTIVATION_CODE_LENGTH);

  const siteUserAssign = await siteUsersRepo.assignActivationCode(siteUserId, activationCode);

  if (!siteUserAssign) {
    return Promise.resolve({
      success: false,
      type: 'danger',
      message: 'Could not find Site User by given ID.',
    });
  }

  const siteUser = await siteUsersRepo.getSiteUserById(siteUserId);

  const userDetails = Object.assign({
    // name: `${siteUserAssign.first_name} ${siteUserAssign.last_name}`,
    address: siteUser.email.toLowerCase(),
    activation_code: activationCode,
  });

  commander.handle(commander.commands.SEND_SITE_USER_ACTIVATION_EMAIL, {}, { userDetails });

  return Promise.resolve({
    success: true,
    type: 'success',
    message: 'Successfully resent activation email.',
  });
}

module.exports = {
  handle,
};
