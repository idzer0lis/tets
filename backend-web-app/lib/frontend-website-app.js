const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressWinston = require('express-winston');
const expressSession = require('express-session');
const sanitizer = require('express-sanitizer');
const RedisStore = require('connect-redis')(expressSession);
const csurf = require('csurf');
const cors = require('cors');
const recursiveSanitizer = require('./modules/recursive-request-body-sanitizer');

const env = require('./config/env');

const logger = require('./helpers/logger');
const passport = require('./auth');

// Strategy for authenticating using the username and the password
require('./auth/strategies/frontend-local-authenticator');
// We need to set up user (de)serialization from the session
require('./auth/mount-serializer')(passport, require('./auth/serializers/frontend'));

const app = express();

app.set('env', env.NODE_ENV);

// Trust the first proxy
app.set('trust proxy', 1);

if (env.CORS_ALLOWED === 'YES') {
  app.options('*', cors({
    credentials: true,
    origin: true,
    allowedHeaders: [
      'Content-Type',
      'Content-Length',
      'Authorization',
      'x-csrf-token',
    ],
    exposedHeaders: [
      'Content-Type',
      'Content-Length',
      'Content-Range',
      'X-Content-Range',
      'x-csrf-token',
    ],
  }));
  app.use(cors({
    credentials: true,
    origin: true,
    allowedHeaders: [
      'Content-Type',
      'Content-Length',
      'Authorization',
      'x-csrf-token',
    ],
    exposedHeaders: [
      'Content-Type',
      'Content-Length',
      'Content-Range',
      'X-Content-Range',
      'x-csrf-token',
    ],
  }));
}

app.use(expressWinston.logger({
  winstonInstance: logger,
  meta: false,
  msg: 'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
  colorize: env.NODE_ENV === 'development',
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(sanitizer());
app.use(recursiveSanitizer.middleware());

app.use(cookieParser());

let sessionStore;
if (env.SESSION_REDIS_HOST && env.SESSION_REDIS_PORT) {
  const redisOptions = {
    host: env.SESSION_REDIS_HOST,
    port: env.SESSION_REDIS_PORT,
    pass: process.env.SESSION_REDIS_PASSWORD || undefined,
    db: parseInt(process.env.SESSION_REDIS_DB || '0', 10),
    prefix: env.SESSION_REDIS_KEY_PREFIX || 'front:sess:',
    logErrors: (err) => {
      logger.error('Session Redis error', err);
    },
  };
  sessionStore = new RedisStore(redisOptions);
} else {
  sessionStore = undefined;
  logger.warn('Redis store options not found. Defaulting to memory store');
}

app.use(expressSession({
  store: sessionStore,
  secret: env.SESSION_COOKIE_SECRET,
  name: env.SESSION_COOKIE_NAME,
  saveUninitialized: true,
  resave: false,
  cookie: {
    secure: env.SESSION_COOKIE_SECURE === 'YES',
    path: env.SESSION_COOKIE_PATH,
    maxAge: parseInt(env.SESSION_COOKIE_MAX_AGE_MS, 10),
    httpOnly: true,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

// Setup CSRF protection and add some logging/response embellishment
if (env.CORS_ALLOWED !== 'YES') {
  app.use(csurf({
    cookie: {
      sameSite: env.CORS_ALLOWED === 'NO' ? 'strict' : false,
    },
  }), (err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);

    logger.error('Bad or missing CSRF token!');
    // return res.sendStatus(403);
    return next();
  }, (req, res, next) => {
    const csrfToken = req.csrfToken();

    res.cookie('_csrf_token', csrfToken);
    res.header('x-csrf-token', csrfToken);

    res.locals.csrfToken = csrfToken;

    if (req.body) {
      // eslint-disable-next-line no-underscore-dangle
      delete req.body._csrf;
    } // delete csrf token from body after check to prevent db conflict debacles
    next();
  });
}

// Mount some user information on the response locals
app.use((req, res, next) => {
  res.locals.login = req.isAuthenticated();
  res.locals.user = req.user || {};
  next();
});

app.use('/api', require('./routes/frontend-api'));

if (env.NODE_ENV === 'development') {
// eslint-disable-next-line global-require,import/no-extraneous-dependencies
  app.use(require('http-proxy-middleware')('/', { target: 'http://localhost:8080', ws: true }));
}

app.use(expressWinston.errorLogger({
  winstonInstance: logger,
  colorize: env.NODE_ENV === 'development',
}));

// error handler
// noinspection JSUnusedLocalSymbols
app.use((err, req, res, next) => {
  logger.error('Express error handler reached', err);// set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = env.NODE_ENV === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(env.HTTP_SERVER_PORT, env.HTTP_SERVER_ADDRESS, () => {
  logger.info(`Server is listening on ${env.HTTP_SERVER_ADDRESS}:${env.HTTP_SERVER_PORT}`);
});
