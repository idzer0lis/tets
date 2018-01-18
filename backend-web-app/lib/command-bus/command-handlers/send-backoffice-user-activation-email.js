const mailer = require('../../helpers/emailer');
const env = require('../../config/env');

async function handle({}, { userDetails }) {
  if (!userDetails) {
    throw new Error('Missing user ID on payload');
  }

  const locals = {
    user: {
      name: userDetails.name,
      address: userDetails.address,
      activation_code: userDetails.activationCode,
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
      view: 'activation-email',
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
