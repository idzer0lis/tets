const mailer = require('../../helpers/emailer');
const env = require('../../config/env');

async function handle({}, { userDetails }) {
  if (!userDetails) {
    throw new Error('Missing user ID on payload');
  }

  const locals = {
    user: {
      // name: `${siteUserDetails.first_name} ${siteUserDetails.last_name}`,
      address: userDetails.address,
      activation_code: userDetails.activation_code,
    },
    urls: {
      website_root_url: env.FRONTEND_URL_WEBSITE_ROOT,
      static_assets_root_url: env.URL_STATIC_ASSETS,
    },
  };

  const recipients = [
    {
      message: {
        to: locals.user.address,
      },
      view: 'site-user-activation-email',
    },
  ];

  return mailer.enqueueEmail({
    locals,
    recipients,
  });
}

module.exports = {
  handle,
};
