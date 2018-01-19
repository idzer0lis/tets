const mailer = require('../../helpers/emailer');
const env = require('../../config/env');
const siteUsersRepo = require('../../repositories/site-users');

async function handle({}, { email }) {
  if (!email) {
    throw new Error('Missing user email on payload');
  }

  const siteUserDetails = await siteUsersRepo.getSiteUserByEmail(email);

  const locals = {
    user: {
      // name: `${userDetails.first_name} ${userDetails.last_name}`,
      address: siteUserDetails.email,
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
      view: 'password-changed-notification-email',
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
