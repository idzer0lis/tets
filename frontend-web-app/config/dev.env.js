'use strict'
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  VUE_USE_LIVE_API: `"${process.env.VUE_USE_LIVE_API || 'YES'}"`,
  API_ROOT_URL: `"${process.env.API_ROOT_URL || ''}"`,
  MAILCHIMP_POST_URL: `"${process.env.MAILCHIMP_POST_URL || ''}"`,
  GA_SITE_KEY: `"${process.env.GA_SITE_KEY || ''}"`,
  RECAPTCHA_SITE_KEY: `"${process.env.RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}"`,
  ICO_LISTING_ENABLED: `"${process.env.ICO_LISTING_ENABLED || 'NO'}"`,
  ICO_LISTING_REDIRECT: `"${process.env.ICO_LISTING_REDIRECT || 'NO'}"`,
  LOGIN_REDIRECT: `"${process.env.LOGIN_REDIRECT || 'NO'}"`,
});
