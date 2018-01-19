/* eslint-disable no-underscore-dangle */

// const recursiveSanitizer = require('../modules/recursive-request-body-sanitizer');
const { isLoggedIn, isNotLoggedIn } = require('../modules/logged-or-not');
const captcha = require('../helpers/captcha-middleware');
const { setRequestErrorIfValidationFails } = require('../helpers/request-body-validator');
const { isProperPassword, isPasswordMatch } = require('../helpers/password-validator');
const { isLength } = require('validator');
const { isEmail } = require('validator');
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
    console.log(err);
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

router.get('/register', asyncMiddleware(async (req, res, next) => res.json(response(true, 'CSRF Token.', res.locals.csrfToken))));

router.post('/register', captcha, asyncMiddleware(async (req, res, next) => {
  if (!req.captcha || !req.captcha.success) {
    return res.json(response(false, 'Please make sure you are not a robot', null));
  }

  setRequestErrorIfValidationFails(req, (f) => isLength(f, {
    min: 5,
    max: 100,
  }), 'email', 'Email length must be between 5 and 100 characters.');
  if (req.validationErrors.length < 1) {
    setRequestErrorIfValidationFails(req, isEmail, 'email', flashMessages.REGISTER_INVALID_EMAIL);
  }
  setRequestErrorIfValidationFails(req, () => isPasswordMatch(req.body.password, req.body.confirm_password), 'password', flashMessages.REGISTER_MATCHING_PASSWORDS);
  setRequestErrorIfValidationFails(
    req, isProperPassword, 'password',
    flashMessages.REGISTER_INSECURE_PASSWORD,
  );

  if (!req.isValid) {
    return res.json(response(false, req.validationErrors, null));
  }

  const { result: siteUserSaveResult, error } = await commander.handle(commander.commands.CREATE_SITE_USER, {}, { user: req.body });
  if (error) {
    return res.status(500).json(response(false, 'Could not create new user', null));
  }

  return res.status(200).json(response(siteUserSaveResult.state, siteUserSaveResult.message, {}));
}));

router.post('/activate', isNotLoggedIn, asyncMiddleware(async (req, res, next) => {
  const { result: activatedUser, error } = await commander.handle(commander.commands.ACTIVATE_SITE_USER, {}, { activationCode: req.body.code });
  if (error) {
    res.status(500).json(response(false, flashMessages.ACTIVATION_FAIL, null));
  }

  return res.json(response(activatedUser.type, activatedUser.message, {}));
}));

router.post('/recover-password', isNotLoggedIn, captcha, asyncMiddleware(async (req, res, next) => {
  if (!req.captcha || !req.captcha.success) {
    return res.json(response(false, 'Please make sure you are not a robot', null));
  }

  setRequestErrorIfValidationFails(req, isEmail, 'email', flashMessages.RECOVER_PASSWORD_INVALID_EMAIL);

  if (!req.isValid) {
    return res.json(response(false, req.validationErrors.join(', '), null));
  }

  const { result: user, error } = await commander.handle(commander.commands.INITIALIZE_SITE_USER_PASSWORD_RESET, {}, { email: req.body.email });

  if (!user) {
    return res.status(200).json(response(true, flashMessages.RECOVER_PASSWORD_USER_NOT_FOUND, null));
  }

  if (user.activated_at === null) {
    return res.status(200).json(response(false, flashMessages.RECOVER_PASSWORD_ACCOUNT_NOT_ACTIVATED, null));
  }

  if (error) {
    return res.status(500).json(response(false, flashMessages.RECOVER_PASSWORD_ERROR, null));
  }

  // We don't care if the e-mail gets sent right away or not
  commander.handle(commander.commands.SEND_SITE_USER_PASSWORD_RESET_EMAIL, {}, {
    email: req.body.email,
    passwordResetCode: user.password_reset_code,
  });

  return res.json(response(true, flashMessages.RECOVER_PASSWORD_SENT_EMAIL, null));
}));

router.get('/reset-password', asyncMiddleware(async (req, res, next) => res.json(response(true, 'CSRF Token.', res.locals.csrfToken))));

router.post('/reset-password', asyncMiddleware(async (req, res, next) => {
  setRequestErrorIfValidationFails(req, (f) => /^[a-zA-Z0-9_=-]{10,}$/.test(f), 'password_reset_code', flashMessages.RECOVER_PASSWORD_INVALID_CODE);
  setRequestErrorIfValidationFails(req, () => isPasswordMatch(req.body.password, req.body.confirm_password), 'password', flashMessages.RECOVER_PASSWORD_MATCHING_PASSWORDS);
  setRequestErrorIfValidationFails(req, isProperPassword, 'password', flashMessages.RECOVER_PASSWORD_INSECURE_PASSWORD);

  if (!req.isValid) {
    return res.json(response(false, req.validationErrors.join(', '), null));
  }

  const { result: user, error } = await commander.handle(commander.commands.RESET_SITE_USER_PASSWORD, {}, {
    passwordResetCode: req.body.password_reset_code,
    password: req.body.password,
  });

  if (error) {
    return res.status(500).json(response(false, flashMessages.RECOVER_PASSWORD_FAIL, null));
  }

  return res.json(response(user.success, user.message, null));
}));

module.exports = router;
