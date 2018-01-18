/* eslint-disable no-underscore-dangle */

const recursiveSanitizer = require('../modules/recursive-request-body-sanitizer');
const { isLoggedIn, isNotLoggedIn } = require('../modules/logged-or-not');
const captcha = require('../helpers/captcha-middleware');
const flashMessages = require('../constants/flash-messages');

const express = require('express');
const _ = require('underscore');

const passport = require('../auth/strategies/frontend-local-authenticator');
const commander = require('../command-bus');
const env = require('../config/env');
const siteUsersRepo = require('../repositories/site-users');

const logger = require('../helpers/logger');
const asyncMiddleware = require('../helpers/async-middleware');

const response = require('../helpers/json-response');


const router = express.Router();

router.get('/', asyncMiddleware(async (req, res, next) => res.status(200).json(response(true, 'Hello', null))));

router.get('/login', isNotLoggedIn, asyncMiddleware(async (req, res, next) => res.json(response(true, 'CSRF Token.', res.locals.csrfToken))));

router.post(
  '/login',
  isNotLoggedIn,
  captcha,
  passport.authenticate('local', {
    failureFlash: false,
    failWithError: true,
  }),
  asyncMiddleware(async (req, res, next) => {
    if (!req.captcha || !req.captcha.success) {
      return res.json(response(false, 'Please make sure you are not a robot', null));
    }

    let userDetails = { session: null };
    try {
      userDetails = await siteUsersRepo.getSiteUserDetailsById(req.user.site_user_id);
    } catch (err) {
      logger.warn('No session found.', err);
    }
    return res.status(200).json(response(true, flashMessages.LOGIN_SUCCESS, {
      user: _.pick(req.user, 'site_user_id', 'email'),
      userDetails: _.pick(
        userDetails,
        'first_name',
        'last_name',
        'nationality',
        'country_of_residence',
      ),
    }));
  }),
  (err, req, res, next) => {
    // Handle error
    if (err.status === 400) {
      return res.status(400).json(response(false, err.message, req.body.email));
    }
    return res.status(401).json(response(false, req.passportError, req.body.email));
  },
);

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.session.destroy(() => {
    commander.handle(commander.commands.LOGOUT_SITE_USER, { req }, { siteUserId: req.user.site_user_id });

    res.clearCookie(env.SESSION_COOKIE_NAME);
    // res.clearCookie(env.REMEMBER_ME_COOKIE_NAME);

    res.status(200).json(response(true, flashMessages.LOGOUT, null));
  });
});

router.get('/session', asyncMiddleware(async (req, res, next) => {

  let userDetails = { session: null };
  if (req.user && req.user.site_user_id) {
    try {
      userDetails = await siteUsersRepo.getSiteUserDetailsById(req.user.site_user_id);
    } catch (err) {
      logger.warn('No session found.', err);
    }
  }

  return res.json(response(true, '', {
    user: req.user ? _.pick(req.user, 'site_user_id', 'email') : null,
    userDetails: _.pick(
      userDetails,
      'first_name',
      'last_name',
      'nationality',
      'country_of_residence',
    ),
  }));
}));

module.exports = router;
