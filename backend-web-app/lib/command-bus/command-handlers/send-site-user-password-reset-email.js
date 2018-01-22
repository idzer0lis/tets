const mailer = require('../../helpers/emailer');
const env = require('../../config/env');
const siteUsersRepo = require('../../repositories/site-users');

async function handle({}, { email, passwordResetCode }) {
  if (!email || !passwordResetCode) {
    throw new Error('Missing payload data.');
  }

  const siteUserDetails = await siteUsersRepo.getSiteUserByEmail(email);

  const locals = {
    user: {
      // name: `${siteUserDetails.first_name} ${userDetails.last_name}`,
      address: siteUserDetails.email,
      password_reset_code: siteUserDetails.password_reset_code,
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
      view: 'site-user-reset-password',
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
