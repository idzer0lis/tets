require('../../../node-environment');

const flashMessages = require('../../constants/flash-messages');

async function handle({}, { siteUserId }) {
  if (!siteUserId) {
    throw new Error('Missing payload');
  }

  return Promise.resolve({
    state: true, type: 'success', message: flashMessages.LOGOUT,
  });
}

module.exports = {
  handle,
};
