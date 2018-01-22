const env = require('../config/env');
const logger = require('../helpers/logger');

module.exports = function sessionMaxAgeEnforcerBuilder() {
  return function sessionMaxAgeEnforcer(req, res, next) {
    if (!req.session) {
      return next();
    }

    if (!req.session.startedAt || typeof req.session.startedAt !== 'number') {
      req.session.startedAt = new Date().getTime();
      return next();
    } else if (new Date().getTime() >= ((parseInt(env.SESSION_MAX_AGE_SECONDS, 10) * 1000) + req.session.startedAt)) {
      logger.info('Session expired, forcing logout if user available');
      const wasLoggedIn = !!res.user;
      return req.session.destroy((err) => {
        if (err) {
          logger.error('Error destroying session', err);
        }

        if (wasLoggedIn) {
          return res.redirect('/logout');
        }

        return res.redirect('/login');
      });
    }

    return next();
  };
};
