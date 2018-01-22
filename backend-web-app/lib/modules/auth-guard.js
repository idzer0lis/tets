function addErrorFlashMessage(req) {
  req.session.flash.messages.push({
    type: 'danger',
    message: 'You do not have the correct permissions to view this page.',
  });
}

module.exports = function authGuardBuilder({ roles = [], permissions = [], permissionsConjunction = 'AND' }) {
  if (!Array.isArray(roles)) {
    // eslint-disable-next-line no-param-reassign
    roles = [roles];
  }

  if (!Array.isArray(permissions)) {
    // eslint-disable-next-line no-param-reassign
    permissions = [permissions];
  }

  return function authGuard(req, res, next) {
    if (!req.user) {
      return res.redirect('/login');
    }

    // The user NEEDS to be logged in
    if (!req.user.user_id) {
      return res.redirect('/login');
    }

    if (roles.length) {
      if (!req.user.roles) {
        addErrorFlashMessage(req);
        return res.redirect(req.headers.referer || '/');
      }

      if (roles.some((role) => req.user.roles.indexOf(role) === -1)) {
        addErrorFlashMessage(req);
        return res.redirect(req.headers.referer || '/');
      }
    }

    if (permissions.length) {
      if (!req.user.permissions) {
        addErrorFlashMessage(req);
        return res.redirect(req.headers.referer || '/');
      }

      if (permissionsConjunction === 'AND') {
        if (permissions.some((permission) => req.user.permissions.indexOf(permission) === -1)) {
          addErrorFlashMessage(req);
          return res.redirect(req.headers.referer || '/');
        }
      } else if (permissionsConjunction === 'OR') {
        if (permissions.some((permission) => req.user.permissions.indexOf(permission) !== -1)) {
          // Any permission satisfies the condition
          return next();
        }

        addErrorFlashMessage(req);
        return res.redirect(req.headers.referer || '/');
      } else {
        throw new Error(`Unknown permissions conjunction: ${permissionsConjunction}`);
      }
    }

    return next();
  };
};
