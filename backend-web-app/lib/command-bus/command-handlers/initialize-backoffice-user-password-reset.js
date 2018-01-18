const usersRepo = require('../../repositories/users');
const crypto = require('crypto');
const commander = require('../../command-bus');

const RANDOM_RESET_PASSWORD_CODE_LENGTH = 50;

function createRandomActivationCode(randomResetPasswordCodeLength) {
  const resetPasswordCode = crypto.randomBytes(randomResetPasswordCodeLength).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
    .replace(/=/g, '');

  return { resetPasswordCode };
}

async function handle({}, { email }) {
  const user = await usersRepo.getUserByEmail(email);

  if (!user) {
    return Promise.resolve({
      state: false, type: 'danger', message: 'User not found by email.',
    });
  }

  if (user.activated_at === null) {
    return Promise.resolve({
      state: false,
      type: 'danger',
      message: 'User not activated. Activate account before requesting a password change.',
    });
  }

  const { resetPasswordCode } = createRandomActivationCode(RANDOM_RESET_PASSWORD_CODE_LENGTH);

  const updatedUser = await usersRepo.setUserPasswordResetCode(email, resetPasswordCode);

  const userDetails = Object.assign({
    name: `${user.first_name} ${user.last_name}`,
    address: user.email.toLowerCase(),
    resetPasswordCode,
  });

  commander.handle(commander.commands.SEND_BACKOFFICE_USER_PASSWORD_RESET_EMAIL, {}, { userDetails });

  return Promise.resolve({
    state: true,
    type: 'success',
    message: 'Password reset request processed.',
    user: updatedUser,
  });
}

module.exports = { handle };
