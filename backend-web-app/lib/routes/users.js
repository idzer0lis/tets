const { isLoggedIn } = require('../modules/logged-or-not');
const { setRequestErrorIfValidationFails } = require('../helpers/request-body-validator');
// const { isProperPassword, isPasswordMatch } = require('../helpers/password-validator');
const { isEmail } = require('validator');
const { permissionCodes } = require('../constants');
// const logger = require('../helpers/logger');
// const flashMessages = require('../constants/flash-messages');

const authGuard = require('../modules/auth-guard');

const express = require('express');

const asyncMiddleware = require('../helpers/async-middleware');
const generalRepo = require('../repositories/general');
const usersRepo = require('../repositories/users');

const router = express.Router();

const commander = require('../command-bus');

router.use(isLoggedIn);

router.get('/', isLoggedIn, authGuard({ permissions: permissionCodes.MANAGE_SITE_USERS }), asyncMiddleware(async (req, res, next) => {
  res.locals.roles = await usersRepo.getRoles();
  return res.render('users-pages/list', {
    title: 'WealthE - Users List',
    locals: res.locals,
  });
}));

router.get('/data', isLoggedIn, authGuard({ permissions: permissionCodes.MANAGE_SITE_USERS }), asyncMiddleware(async (req, res, next) => {
  if (req.query.datatable.query !== undefined && req.query.datatable.query['role.role_code'] === undefined) {
    delete req.query.datatable.query['role.role_code'];
  }
  const { queryResult, countQueryResult } = await usersRepo.getPagedUsersWithRoles(req.query.datatable);
  return res.json({
    meta: {
      field: req.query.datatable.pagination.field,
      page: req.query.datatable.pagination.page,
      pages: Math.ceil(countQueryResult / 10),
      perpage: req.query.datatable.pagination.perpage,
      sort: req.query.datatable.pagination.sort,
      total: countQueryResult,
    },
    data: queryResult,
  });
}));

router.get('/create', isLoggedIn, authGuard({ permissions: permissionCodes.CREATE_BACKOFFICE_USER }), asyncMiddleware(async (req, res, next) => {
  const roles = await generalRepo.getRoles();

  return res.render('users-pages/create', {
    title: 'WealthE - Create User',
    locals: res.locals,
    user_roles: roles.map((item) => item),
  });
}));

router.post('/create', isLoggedIn, authGuard({ permissions: permissionCodes.CREATE_BACKOFFICE_USER }), asyncMiddleware(async (req, res, next) => {
  setRequestErrorIfValidationFails(req, (f) => /^\w[\w\d-]+(\s\s*[\w\d-]+)*$/.test(f), 'first_name', 'The First Name is missing or invalid');
  setRequestErrorIfValidationFails(req, (f) => /^\w[\w\d-]+(\s\s*[\w\d-]+)*$/.test(f), 'last_name', 'The Last Name is missing or invalid');
  setRequestErrorIfValidationFails(req, isEmail, 'email', 'Email address is either missing or invalid.');

  if (!req.isValid) {
    req.validationErrors.forEach((message) => {
      req.session.flash.messages.push({
        type: 'danger',
        message,
      });
    });
    return res.redirect('/users/create');
  }

  const { result: userSaveResult, error } = await commander.handle(commander.commands.CREATE_BACKOFFICE_USER, {}, { user: req.body });
  if (error) {
    return next(error);
  }

  req.session.flash.messages.push({
    type: userSaveResult.type,
    message: userSaveResult.message,
  });

  if (!userSaveResult.state) {
    return res.redirect('/users/create');
  }

  return res.redirect('/users');
}));

router.post('/resend-activation-email/:userId', isLoggedIn, authGuard({ permissions: permissionCodes.ACTIVATE_BACKOFFICE_USER }), asyncMiddleware(async (req, res, next) => {
  const user = await usersRepo.getUserById(parseInt(req.params.userId, 10));
  const userDetails = Object.assign({
    name: `${user.first_name} ${user.last_name}`,
    address: user.email.toLowerCase(),
    activationCode: user.activation_code,
  });

  commander.handle(commander.commands.SEND_BACKOFFICE_USER_ACTIVATION_EMAIL, {}, { userDetails });

  req.session.flash.messages.push({
    type: 'success',
    message: 'Activation e-mail successfully sent.',
  });

  return res.redirect('/users');
}));

module.exports = router;
