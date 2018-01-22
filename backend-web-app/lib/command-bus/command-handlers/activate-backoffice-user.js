const bcrypt = require('bcrypt');
const usersRepo = require('../../repositories/users');

async function handle({}, { activationCode, password }) {
  const generateHash = await bcrypt.hash(password, bcrypt.genSaltSync(8), null);

  const foundUser = await usersRepo.getUserByActivationCode(activationCode);

  if (!foundUser) {
    return Promise.resolve({
      state: false, type: 'danger', message: 'Could not find user by activation code.',
    });
  }

  const user = await usersRepo.activateUserByActivationCode(activationCode, generateHash);

  if (!user) {
    return Promise.resolve({
      state: false, type: 'danger', message: 'Account is either activated or link expired.',
    });
  }

  return Promise.resolve({
    state: true, type: 'success', message: 'Your account is now activated and you can now login.',
  });
}

module.exports = { handle };
