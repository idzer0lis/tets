/**
 * Created by sandrastoicescu on 23/11/2017.
 */

// TODO: This is deprecated ; use auth-guard.js instead
module.exports = function permissionGuard(permissionName) {
  return function checkPermission(req, res, next) {
    if (req && req.user && !(req.user.permissions.find((element) => element.permission_name === permissionName))) {
      req.session.flash.messages.push({ type: 'danger', message: 'You do not have the correct permissions to view this page.' });
      return res.redirect('/');
    }
    return next();
  };
};
