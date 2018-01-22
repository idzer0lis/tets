const siteUsersRepo = require('../../repositories/site-users');

async function handle({}, { siteUserId }) {
  const user = await siteUsersRepo.activateSiteUserById(siteUserId);

  if (!user) {
    return Promise.resolve({
      success: false,
      type: 'danger',
      message: 'Missing Site User ID from Payload.',
    });
  }

  return Promise.resolve({
    success: true,
    type: 'success',
    message: 'Site user\'s account has been successfully activated.',
    user,
  });
}

module.exports = { handle };
