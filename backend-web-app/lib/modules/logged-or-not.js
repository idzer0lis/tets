/**
 * Created by sandrastoicescu on 23/11/2017.
 */

/* eslint-disable no-use-before-define */

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
};

/* eslint-enable no-use-before-define */

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
}

function isNotLoggedIn(req, res, next) {
  if (req.isUnauthenticated()) {
    return next();
  }
  return res.redirect('/');
}
