const mailer = require('../../helpers/emailer');
const env = require('../../config/env');

async function handle({}, { userDetails }) {
  if (!userDetails) {
    throw new Error('Missing payload data.');
  }

  const locals = {
    user: {
      name: userDetails.name,
      address: userDetails.address,
      password_reset_code: userDetails.resetPasswordCode,
    },
    urls: {
      website_root_url: env.URL_WEBSITE_ROOT,
      static_assets_root_url: env.URL_STATIC_ASSETS,
    },
  };

  const recipients = [
    {
      message: {
        to: locals.user,
      },
      view: 'reset-password',
    },
  ];

  mailer.enqueueEmail({
    locals,
    recipients,
  });

  return Promise.resolve();
}

module.exports = {
  handle,
};
