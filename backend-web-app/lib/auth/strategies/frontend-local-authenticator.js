const passport = require('passport');
const { Strategy } = require('passport-local');
const service = require('../../service/index');

passport.use(new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  ((req, email, password, cb) => service.checkFrontendUser((email || '').toLowerCase(), password)
    .then((checkResult) => {
      if (!checkResult.state) {
        req.passportError = checkResult.message;
        cb(null, false);
        return null;
      }
      cb(null, checkResult.user);
      return null;
    })
    .catch((err) => {
      cb(err);
      return null;
    })),
));

module.exports = passport;
