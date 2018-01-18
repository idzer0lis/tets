const mailer = require('../../helpers/emailer');
const env = require('../../config/env');

async function handle({ req }) {
  if (!req || !req.user || !req.user.user_id) {
    throw new Error('Missing user ID on payload');
  }

  const userDetails = req.user;

  const locals = {
    user: {
      name: `${userDetails.first_name} ${userDetails.last_name}`,
      address: userDetails.address,
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
      view: 'login',
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
