const { isLoggedIn } = require('../modules/logged-or-not');
const { permissionCodes } = require('../constants');

const authGuard = require('../modules/auth-guard');

const express = require('express');
const commander = require('../command-bus');

const logger = require('../helpers/logger');
const asyncMiddleware = require('../helpers/async-middleware');
const siteUsersRepo = require('../repositories/site-users');

const router = express.Router();

router.use(isLoggedIn);

router.get('/', isLoggedIn, authGuard({ permissions: permissionCodes.MANAGE_SITE_USERS }), asyncMiddleware(async (req, res, next) => res.render('site-users-pages/list', {
  title: 'WealthE - Site Users List',
  locals: res.locals,
})));

router.get('/data', isLoggedIn, authGuard({ permissions: permissionCodes.MANAGE_SITE_USERS }), asyncMiddleware(async (req, res, next) => {
  const { queryResult, countQueryResult } = await siteUsersRepo.getPagedSiteUsers(req.query.datatable);
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

router.get('/details/:id', isLoggedIn, authGuard({ permissions: permissionCodes.MANAGE_SITE_USERS }), asyncMiddleware(async (req, res, next) => res.render('pages/site-user-details', {
  title: 'Site User Details',
  locals: res.locals,
})));

router.post('/activate/:siteUserId', isLoggedIn, authGuard({ permissions: permissionCodes.ACTIVATE_SITE_USER }), asyncMiddleware(async (req, res, next) => {
  const { result: siteUserActivateResult, error } = await commander.handle(commander.commands.BACKOFFICE_ACTIVATE_SITE_USER, {}, { siteUserId: parseInt(req.params.siteUserId, 10) });

  if (error) {
    logger.error('Could not activate site user.', error);
    req.session.flash.messages.push({
      type: 'danger',
      message: 'Could not activate site user.',
    });
    return res.redirect('/site-users');
  }

  req.session.flash.messages.push({
    type: siteUserActivateResult.type,
    message: siteUserActivateResult.message,
  });
  return res.redirect('/site-users');
}));

router.post('/deactivate/:siteUserId', isLoggedIn, authGuard({ permissions: permissionCodes.DEACTIVATE_SITE_USER }), asyncMiddleware(async (req, res, next) => {
  const { result: siteUserDeactivateResult, error } = await commander.handle(commander.commands.BACKOFFICE_DEACTIVATE_SITE_USER, {}, { siteUserId: parseInt(req.params.siteUserId, 10) });

  if (error) {
    logger.error('Could not deactivate site user.', error);
    req.session.flash.messages.push({
      type: 'danger',
      message: 'Could not deactivate site user.',
    });
    return res.redirect('/site-users');
  }

  req.session.flash.messages.push({
    type: siteUserDeactivateResult.type,
    message: siteUserDeactivateResult.message,
  });
  return res.redirect('/site-users');
}));

router.post('/resend-activation-email/:siteUserId', isLoggedIn, authGuard({ permissions: permissionCodes.MANAGE_SITE_USERS }), asyncMiddleware(async (req, res, next) => {
  const { result: sentEmail, error } = await commander.handle(commander.commands.RESEND_SITE_USER_ACTIVATION_EMAIL, {}, { siteUserId: parseInt(req.params.siteUserId, 10) });

  if (error) {
    logger.error('Could not send email.');
    req.session.flash.messages.push({
      type: 'danger',
      message: 'Could not send email',
    });
    return res.redirect('/site-users');
  }

  req.session.flash.messages.push({
    type: sentEmail.type,
    message: sentEmail.message,
  });
  return res.redirect('/site-users');
}));

module.exports = router;
