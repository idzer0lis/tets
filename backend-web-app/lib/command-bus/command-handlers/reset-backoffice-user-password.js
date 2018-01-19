const bcrypt = require('bcrypt');
const moment = require('moment');
const usersRepo = require('../../repositories/users');
const commander = require('../../command-bus');

async function handle({}, { passwordResetCode, password }) {
  const generateHash = await bcrypt.hash(password, bcrypt.genSaltSync(8), null);

  const user = await usersRepo.getUserByPasswordResetCode(passwordResetCode);

  if (!user) {
    return Promise.resolve({
      state: false, type: 'danger', message: 'The link has expired. Please submit a new request.',
    });
  }

  if (moment(user.password_reset_code_expires_at).isBefore(moment())) {
    return Promise.resolve({
      state: false, type: 'danger', message: 'The link has expired. Please submit a new request.',
    });
  }

  await usersRepo.changeUserPassword(passwordResetCode, generateHash);

  const userDetails = Object.assign({
    name: `${user.first_name} ${user.last_name}`,
    address: user.email.toLowerCase(),
  });

  commander.handle(commander.commands.SEND_PASSWORD_RESET_NOTIFICATION_EMAIL, {}, { userDetails });

  return Promise.resolve({
    state: true, type: 'success', message: 'You can now log in with your new password.', user,
  });
}

module.exports = { handle };
