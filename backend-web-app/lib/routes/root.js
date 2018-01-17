const { isLoggedIn, isNotLoggedIn } = require('../modules/logged-or-not');
// const { isEmail } = require('validator');
// const { setRequestErrorIfValidationFails } = require('../helpers/request-body-validator');
// const { isProperPassword, isPasswordMatch } = require('../helpers/password-validator');
// const flashMessages = require('../constants/flash-messages');

const express = require('express');

const passport = require('../auth/strategies/local-authenticator');
const logger = require('../helpers/logger');
const env = require('../config/env');
const commander = require('../command-bus');

const asyncMiddleware = require('../helpers/async-middleware');
// const usersRepo = require('../repositories/users');

const router = express.Router();

router.get('/404', (req, res, next) => res.status(404).render('404', {
  layout: false,
  im: req.query.im,
  locals: res.locals,
}));

router.get('/', isLoggedIn, (req, res, next) => res.render('general-pages/dashboard', {
  locals: res.locals,
  title: 'Wealth - Admin Dashboard',
}));

router.get('/login', isNotLoggedIn, asyncMiddleware(async (req, res, next) => res.render('login', {
  title: 'Wealth - Login',
  layout: false,
  locals: res.locals,
})));

router.post(
  '/login', isNotLoggedIn, passport.authenticate('local', {
    failureFlash: true,
    failWithError: true,
  }),

  (req, res, next) => {
    if (!req.body.remember) {
      return res.redirect('/');
    }

    return commander.handle(commander.commands.SET_USER_REMEMBER_ME, { req, res })
      .then(({ result: cookie, error }) => {
        if (error) {
          return Promise.reject(error);
        }

        res.cookie(env.REMEMBER_ME_COOKIE_NAME, cookie, {
          maxAge: parseInt(env.REMEMBER_ME_COOKIE_MAX_AGE_MS, 10),
          httpOnly: true,
        });
        res.redirect('/');
        return null;
      })
      .catch(next);
  },

  (err, req, res, next) => {
    // We only handle authentication errors here, the rest gets shipped to the default error handler
    // further down the line
    if (err.name === 'AuthenticationError') {
      logger.info('Authentication error, redirecting to login page');
      return res.redirect('/login');
    }
    // Handle error somewhere else, buddy
    return next(err);
  },
);

router.get('/logout', (req, res) => {
  if (req.user) {
    commander.handle(commander.commands.LOGOUT_USER, { req }, {
      userId: req.user.user_id,
      rememberMeCookie: req.cookies[env.REMEMBER_ME_COOKIE_NAME],
    });
  }

  req.session.destroy(() => {
    res.clearCookie(env.SESSION_COOKIE_NAME);
    res.clearCookie(env.REMEMBER_ME_COOKIE_NAME);

    res.redirect('/');
  });
});

module.exports = router;
