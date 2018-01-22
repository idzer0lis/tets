const traverse = require('traverse');
const logger = require('../helpers/logger');

// We shouldn't sanitize some fields like the password field
const ALLOWED_UNSANITIZED_FIELD_NAMES = [
  'password',
  'confirm_password',
  'current_password',
  'new_password',
  'confirm_new_password',
];

function sanitizeRequest(req) {
  req.sanitizedFields = req.sanitizedFields || { body: [], query: [], params: [] };
  const sanitizedFields = [];

  ['body', 'query', 'params'].forEach((reqPartKey) => {
    // We only sanitize strings on the body
    if (typeof req[reqPartKey] === 'object' || Array.isArray(req[reqPartKey])) {
      traverse(req[reqPartKey]).forEach(function bodyTraverser(x) {
        if (!this.isLeaf || typeof x !== 'string') {
          return;
        }

        if (ALLOWED_UNSANITIZED_FIELD_NAMES.indexOf(this.key) !== -1) {
          return;
        }

        const sanitized = req.sanitize(x);
        if (sanitized !== x) {
          this.update(req.sanitize(x));
          req.sanitizedFields[reqPartKey].push(this.path.join('.'));
          sanitizedFields.push([reqPartKey].concat(this.path).join('.'));
        }
      });
    }
  });

  if (sanitizedFields.length) {
    logger.verbose(`Sanitizer has modified ${sanitizedFields.length} request fields`);
    logger.debug('Sanitizer-modified fields are: ', sanitizedFields);
  }

  return req;
}

function traverseAndSanitizeBuilder() {
  return function traverseAndSanitize(req, res, next) {
    sanitizeRequest(req);
    next();
  };
}

module.exports = {
  sanitizer: sanitizeRequest,
  middleware: traverseAndSanitizeBuilder,
};
