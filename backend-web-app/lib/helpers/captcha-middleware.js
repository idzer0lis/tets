/**
 * Created by sandrastoicescu on 15/12/2017.
 */

const axios = require('axios');
const querystring = require('querystring');

const env = require('../config/env');
const response = require('./json-response');
const logger = require('./logger');

module.exports = function captcha(req, res, next) {
  axios.post('https://www.google.com/recaptcha/api/siteverify', querystring.stringify({
    secret: env.GOOGLE_RECAPTCHA_SECRET,
    response: req.body.gRecaptchaResponse,
  }))
    .then((result) => {
      if (!result.data || !result.data.success) {
        logger.warn(result.data);
        return res.json(response(false, 'Please make sure you are not a robot', result.data)); // reaches frontend toast directly
      }
      req.captcha = response(true, 'Captcha checks out', result.data);
      return next();
    });
};
