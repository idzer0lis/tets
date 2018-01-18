const siteUsersRepo = require('../../repositories/site-users');
const flashMessages = require('../../constants/flash-messages');

async function handle({}, { activationCode }) {
  const foundCode = await siteUsersRepo.findActivationCode(activationCode);

  if (!foundCode) {
    return Promise.resolve({
      state: false,
      type: 'danger',
      message: 'Account was confirmed. Link is expired.',
    });
  }

  const user = await siteUsersRepo.activateSiteUserByActivationCode(activationCode);

  if (!user) {
    return Promise.resolve({
      state: false,
      type: 'error',
      message: flashMessages.ACTIVATION_CODE_NOT_FOUND,
    });
  }

  return Promise.resolve({
    state: true,
    type: 'success',
    message: flashMessages.ACTIVATION_SUCCESS,
    user,
  });
}

module.exports = { handle };
