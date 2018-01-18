const { isLoggedIn } = require('../modules/logged-or-not');
// const { setRequestErrorIfValidationFails } = require('../helpers/request-body-validator');
// const { isProperPassword, isPasswordMatch } = require('../helpers/password-validator');
// const { isEmail } = require('validator');
const { permissionCodes } = require('../constants');
// const logger = require('../helpers/logger');
// const flashMessages = require('../constants/flash-messages');

const authGuard = require('../modules/auth-guard');

const express = require('express');

const asyncMiddleware = require('../helpers/async-middleware');
const generalRepo = require('../repositories/general');
const usersRepo = require('../repositories/users');

const router = express.Router();

// const commander = require('../command-bus');

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

  return res.render('pages/create-user', {
    title: 'WealthE - Create User',
    locals: res.locals,
    user_roles: roles.map((item) => item),
  });
}));

module.exports = router;
