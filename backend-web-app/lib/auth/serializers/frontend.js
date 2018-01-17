const siteUsersRepo = require('../../repositories/site-users');

module.exports = {
  serializeUser: (user, cb) => {
    cb(null, user.site_user_id);
    return null;
  },

  deserializeUser: (id, cb) => {
    siteUsersRepo.getSiteUserById(id).then((user) => {
      cb(null, user);
      return null;
    }).catch((err) => {
      cb(err);
      return null;
    });
  },
};
