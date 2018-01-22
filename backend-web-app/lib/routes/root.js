const { isLoggedIn, isNotLoggedIn } = require('../modules/logged-or-not');
const { isEmail } = require('validator');
const { setRequestErrorIfValidationFails } = require('../helpers/request-body-validator');
const { isProperPassword, isPasswordMatch } = require('../helpers/password-validator');
const flashMessages = require('../constants/flash-messages');

const express = require('express');

const passport = require('../auth/strategies/local-authenticator');
const logger = require('../helpers/logger');
const env = require('../config/env');
const commander = require('../command-bus');

const asyncMiddleware = require('../helpers/async-middleware');
const usersRepo = require('../repositories/users');

const router = express.Router();

router.get('/404', (req, res, next) => res.status(404).render('404', {
  layout: false,
  im: req.query.im,
  locals: res.locals,
}));

router.get('/', isLoggedIn, (req, res, next) => res.render('general-pages/dashboard', {
  locals: res.locals,
  title: 'WealthE - Admin Dashboard',
}));

router.get('/login', isNotLoggedIn, asyncMiddleware(async (req, res, next) => res.render('login', {
  title: 'WealthE - Login',
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

router.get('/activate', asyncMiddleware(async (req, res, next) => {
  if (!req.query.code) {
    return res.redirect('/404');
  }

  const activationCode = await usersRepo.findUserActivationCode(req.query.code);
  if (!activationCode) {
    req.session.flash.messages.push({
      type: 'danger',
      message: 'Account is already activated or activation code expired or invalid',
    });
    return res.redirect('/login');
  }

  return res.render('outer-pages/activate-user-account', {
    title: 'WealthE - Activate account',
    layout: false,
    locals: res.locals,
    activationCode: req.query.code,
  });
}));

router.post('/activate', asyncMiddleware(async (req, res, next) => {
  if (req.body.password === '' || req.body.confirm_password === '' || (req.body.password === '' && req.body.confirm_password === '')) {
    req.session.flash.messages.push({
      type: 'danger',
      message: 'Password fields cannot be empty.',
    });

    return res.redirect(`/activate?code=${req.body.activation_code}`);
  }

  setRequestErrorIfValidationFails(req, (f) => /^[a-zA-Z0-9_=-]{10,}$/.test(f), 'activation_code', 'The account activation code is missing or invalid');
  setRequestErrorIfValidationFails(req, () => isPasswordMatch(req.body.password, req.body.confirm_password), 'password', 'Passwords do not match');
  setRequestErrorIfValidationFails(
    req, isProperPassword, 'password',
    flashMessages.ACTIVATION_INSECURE_PASSWORD,
  );

  if (!req.isValid) {
    req.validationErrors.forEach((message) => {
      req.session.flash.messages.push({
        type: 'danger',
        message,
      });
    });
    return res.redirect(`/activate?code=${req.body.activation_code}`);
  }

  const { result: activatedUser, error } = await commander.handle(commander.commands.ACTIVATE_BACKOFFICE_USER, {}, { activationCode: req.body.activation_code, password: req.body.password });
  if (error) {
    return next(error);
  }

  req.session.flash.messages.push({
    type: activatedUser.type,
    message: activatedUser.message,
  });

  return res.redirect('/login');
}));

router.post('/lost-password', asyncMiddleware(async (req, res, next) => {
  setRequestErrorIfValidationFails(req, isEmail, 'email', 'The e-mail address provided is invalid');

  if (!req.isValid) {
    req.session.flash.messages.push({
      type: 'danger',
      message: req.validationErrors.join(','),
    });
    return res.redirect('/login');
  }

  const { result: user, error } = await commander.handle(commander.commands.INITIALIZE_BACKOFFICE_USER_PASSWORD_RESET, {}, { email: req.body.email });
  if (error) {
    req.session.flash.messages.push({
      type: 'danger',
      message: `Error: ${error.message}`,
    });
    return res.redirect('/login');
  }

  req.session.flash.messages.push({
    type: user.type,
    message: user.message,
  });
  if (user.state === false) {
    return res.redirect('/login');
  }
  return res.redirect('/reset-request');
}));

router.get('/reset-request', asyncMiddleware(async (req, res, next) => res.render('outer-pages/generic-page', {
  title: 'Password Reset Request',
  header: 'You requested a password reset',
  content: 'If the email you provided will be found in our database, you will receive a confirmation via email shortly.',
  buttonText: 'Go back to Login',
  buttonLink: '/login',
  locals: res.locals,
  layout: false,
})));

router.get('/reset-password', asyncMiddleware(async (req, res, next) => res.render('outer-pages/reset-password', {
  title: 'GBX - Reset password',
  layout: false,
  passwordResetCode: req.query.code,
  locals: res.locals,
})));

router.post('/reset-password', asyncMiddleware(async (req, res, next) => {
  if (!req.body.password && !req.body.confirm_password) {
    req.session.flash.messages.push({
      type: 'danger',
      message: 'Password fields cannot be empty.',
    });
    return res.redirect(`/reset-password?code=${req.body.password_reset_code}`);
  }
  setRequestErrorIfValidationFails(req, (f) => /^[a-zA-Z0-9_=-]{10,}$/.test(f), 'password_reset_code', 'The password reset code is missing or invalid');
  setRequestErrorIfValidationFails(req, () => isPasswordMatch(req.body.password, req.body.confirm_password), 'password', 'Passwords do not match');
  setRequestErrorIfValidationFails(
    req, isProperPassword, 'password',
    flashMessages.RECOVER_PASSWORD_INSECURE_PASSWORD,
  );

  if (!req.isValid) {
    req.validationErrors.forEach((message) => {
      req.session.flash.messages.push({
        type: 'danger',
        message,
      });
    });
    return res.redirect(`/reset-password?code=${req.body.password_reset_code}`);
  }

  const { result: user, error } = await commander.handle(commander.commands.RESET_BACKOFFICE_USER_PASSWORD, {}, { passwordResetCode: req.body.password_reset_code, password: req.body.password });
  if (error) {
    return next(error);
  }

  req.session.flash.messages.push({
    type: user.type,
    message: user.message,
  });
  return res.redirect('/login');
}));

module.exports = router;
