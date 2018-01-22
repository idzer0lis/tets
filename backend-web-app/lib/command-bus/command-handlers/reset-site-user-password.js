const bcrypt = require('bcrypt');
const moment = require('moment');
const siteUsersRepo = require('../../repositories/site-users');
const flashMessages = require('../../constants/flash-messages');
const commander = require('../../command-bus');
const service = require('../../service/index');

async function handle({}, { passwordResetCode, password }) {
  const generateHash = await bcrypt.hash(password, bcrypt.genSaltSync(8), null);

  const user = await siteUsersRepo.getSiteUserByPasswordResetCode(passwordResetCode);
  if (!user) {
    return Promise.resolve({
      success: false,
      type: 'danger',
      message: flashMessages.RECOVER_PASSWORD_CODE_NOT_FOUND,
    });
  }

  if (await service.verifyPassword(password, user.password) === true) {
    return Promise.resolve({
      success: false,
      type: 'danger',
      message: 'Password cannot be the same as the current password.',
    });
  }

  if (moment(user.password_reset_code_expires_at).isBefore(moment())) {
    return Promise.resolve({
      success: false,
      type: 'danger',
      message: 'Cannot change password due to code being expired.',
    });
  }
  await siteUsersRepo.changeSiteUserPassword(passwordResetCode, generateHash);
  // We don't care if the e-mail gets sent right away or not
  commander.handle(commander.commands.SEND_SITE_USER_PASSWORD_RESET_NOTIFICATION_EMAIL, {}, { email: user.email });
  return Promise.resolve({
    success: true,
    type: 'success',
    message: 'Password successfully changed.',
    user,
  });
}

module.exports = { handle };
