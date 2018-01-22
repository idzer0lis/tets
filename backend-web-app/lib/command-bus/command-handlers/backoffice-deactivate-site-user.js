const siteUsersRepo = require('../../repositories/site-users');
const flashMessages = require('../../constants/flash-messages');

async function handle({}, { siteUserId }) {
  const user = await siteUsersRepo.deactivateSiteUserById(siteUserId);

  if (!user) {
    return Promise.resolve({
      success: false,
      type: 'danger',
      message: flashMessages.ACTIVATION_MISSING_USER_ID,
    });
  }

  return Promise.resolve({
    success: true,
    type: 'success',
    message: 'Site user has been successfully deactivated.',
    user,
  });
}

module.exports = { handle };
