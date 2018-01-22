require('dotenv').config({ path: `${__dirname}/../../.env` });

const path = require('path');

// Environment defaults, they all get overridden by process.env
const env = Object.assign({
  // HTTP server listen defaults
  HTTP_SERVER_PORT: 8000,
  HTTP_SERVER_ADDRESS: '127.0.0.1',

  // Database configuration defaults
  DATABASE_NAME: 'wealthe',
  DATABASE_HOST: '127.0.0.1',
  DATABASE_USERNAME: 'andrei',
  DATABASE_PASSWORD: 'admin12',
  DATABASE_PORT: 5432,

  // Default NodeJS environment
  NODE_ENV: 'development',

  // Session cookie
  SESSION_COOKIE_SECRET: 'awesomeness',
  SESSION_COOKIE_NAME: process.env.NODE_API === 'frontend' ? 'gbx.sid' : 'gbx.admin.sid',
  SESSION_COOKIE_SECURE: 'NO',
  SESSION_COOKIE_PATH: '/',
  SESSION_COOKIE_MAX_AGE_MS: 30 * 60 * 1000,

  // Set this to the number in seconds that the session's max age is allowed ; if
  // the current session becomes older than that, it is destroyed and the user forced
  // to log in
  SESSION_MAX_AGE_SECONDS: 3600 * 4,

  // Remember me cookie
  REMEMBER_ME_COOKIE_NAME: 'wealthe.admin.rmc',
  REMEMBER_ME_COOKIE_MAX_AGE_MS: 3600 * 24 * 14 * 1000,

  // Set to NO to enqueue e-mails in the database instead of sending them right away
  // NB! In this case, the lib/workers/email-sender-queue.js process needs to be run
  SEND_EMAILS_WITHOUT_ENQUEUEING: 'YES',

  // SMTP server config defaults
  SMTP_HOST: 'smtp.mailgun.org',
  SMTP_PORT: 587,
  SMTP_USER: 'sandra.stoicescu@xconta.ro',
  SMTP_PASS: '7I3JzhfTtYnY',

  // See https://nodemailer.com/smtp/pooled/ for details on these settings related to SMTP connection pooling
  SMTP_POOL_ENABLED: 'YES',
  SMTP_POOL_MAX_CONNECTIONS: '5',
  SMTP_POOL_MAX_MESSAGES: '100',
  SMTP_POOL_RATE_DELTA: '10000',
  SMTP_POOL_RATE_LIMIT: '50',

  // System e-mail sender information
  SYSTEM_EMAIL_SENDER_NAME: 'WealthE Team',
  SYSTEM_EMAIL_SENDER_ADDRESS: 'no-reply@dev.wealthe.udevoffice.ro',

  // URLs for site and assets
  FRONTEND_URL_WEBSITE_ROOT: 'http://127.0.0.1:8000',

  URL_WEBSITE_ROOT: 'http://127.0.0.1:8000',
  URL_STATIC_ASSETS: 'http://127.0.0.1:8000',

  // KYC file final storage path
  KYC_STORAGE_PATH: path.join(__dirname, '..', '..', 'storage', 'kyc'),
  KYC_STORAGE_MAX_FILE_SIZE: 30 * 1024 * 1024,

  // Amazon S3-specific KYC storage keys
  KYC_STORAGE_AMAZON_S3_ENABLED: 'NO',
  KYC_STORAGE_AMAZON_S3_BUCKET_NAME: 'gbx-dev',
  KYC_STORAGE_AMAZON_S3_ENDPOINT: 'http://localhost:9000/',
  KYC_STORAGE_AMAZON_S3_REGION: '',
  KYC_STORAGE_AMAZON_S3_SSL_ENABLED: 'NO',
  KYC_STORAGE_AMAZON_S3_FORCE_PATH_STYLE: 'YES',
  KYC_STORAGE_AMAZON_S3_ACCESS_KEY_ID: '96EY6J9H81216Q0ETP3V',
  KYC_STORAGE_AMAZON_S3_SECRET_ACCESS_KEY: 'ecrb0/w3Ft+aQWAy/dZP3GjgswZVExzNM2LeLzWu',

  // Project files storage path
  // Projects have the following structure:
  // -> <project ID>
  //    -> images (anything that is not a team member image)
  //       -> team-members (team member pictures)
  // PROJECT_FILES_STORAGE_ROOT_PATH: path.join(__dirname, '..', '..', 'storage', 'projects'),
  //
  // // Amazon S3-specific Project storage keys
  // PROJECT_STORAGE_AMAZON_S3_ENABLED: 'NO',
  // PROJECT_STORAGE_AMAZON_S3_BUCKET_NAME: 'gbx-dev',
  // PROJECT_STORAGE_AMAZON_S3_ENDPOINT: 'http://localhost:9000/',
  // PROJECT_STORAGE_AMAZON_S3_REGION: '',
  // PROJECT_STORAGE_AMAZON_S3_SSL_ENABLED: 'NO',
  // PROJECT_STORAGE_AMAZON_S3_FORCE_PATH_STYLE: 'YES',
  // PROJECT_STORAGE_AMAZON_S3_ACCESS_KEY_ID: '96EY6J9H81216Q0ETP3V',
  // PROJECT_STORAGE_AMAZON_S3_SECRET_ACCESS_KEY: 'ecrb0/w3Ft+aQWAy/dZP3GjgswZVExzNM2LeLzWu',

  // General temporary storage path
  STORAGE_TEMP_PATH: path.join(__dirname, '..', '..', 'storage', 'tmp'),

  GBX_ICO_ETHEREUM_NODE_MOCK: 'YES',
  // Use these as UNIX millisecond timestamps to set the mock ICO
  // start dates i.e. new Date(2018, 1, 1).getTime()
  GBX_ICO_ETHEREUM_NODE_MOCK_START_DATE: `${new Date(2018, 1, 5).getTime()}`,
  GBX_ICO_ETHEREUM_NODE_MOCK_FULL_GAS_DATE: undefined,
  GBX_ICO_ETHEREUM_NODE_MOCK_END_DATE: `${new Date(2018, 2, 1).getTime()}`,
  // Set some mock values for the contribution status using these
  GBX_ICO_ETHEREUM_NODE_MOCK_CONTRIBUTION_TOTAL_CAP: undefined,
  GBX_ICO_ETHEREUM_NODE_MOCK_USER_CONTRIBUTION_LIMIT: undefined,
  GBX_ICO_ETHEREUM_NODE_MOCK_TOTAL_RAISED: undefined,

  GBX_ICO_ETHEREUM_NODE_PROTOCOL: 'http',
  GBX_ICO_ETHEREUM_NODE_IP: '127.0.0.1',
  GBX_ICO_ETHEREUM_NODE_PORT: '8545',
  GBX_ICO_ETHEREUM_NODE_ENDPOINT: '',

  GBX_ICO_MASTER_CONTRACT: '0xfb419890f5cdffb27c60a31f7453ee432557f21b',

  GBX_ICO_MASTER_CONTRACT_HOLDER_ADDRESS: '0xa0a54b4be11296c9f9681a086f3e7644409bf49f',
  GBX_ICO_MASTER_CONTRACT_HOLDER_KEYSTORE: undefined,
  GBX_ICO_MASTER_CONTRACT_HOLDER_PASSWORD: 'gbxtest123',

  // Etherscan root url
  ETHERSCAN_ROOT_URL: 'https://etherscan.io/address/',

  // Registration/license key for the Froala Editor
  // FROALA_EDITOR_REGISTRATION_KEY: '',

  // Settings for connecting to a Redis cache for general-purpose caching
  CACHE_REDIS_HOST: '127.0.0.1',
  CACHE_REDIS_PORT: '6379',
  CACHE_REDIS_DB: '0',
  CACHE_REDIS_PASSWORD: undefined,
  CACHE_REDIS_KEY_PREFIX: 'gbx:',

  // Set to 'YES' in order to cache the ICO status response from the smart contract
  // This is a good idea since a new block is only mined every about 12-15 seconds anyway
  CACHE_ICO_STATUS: 'NO',
  CACHE_ICO_STATUS_DURATION_MS: '5000',

  // Set to 'YES' in order to cache the ICO contribution status information
  CACHE_ICO_CONTRIBUTION: 'NO',
  CACHE_ICO_CONTRIBUTION_DURATION_MS: '5000',

  // Set this to a value that will allow CORS requests from any client that sends this header
  CORS_ALLOWED: 'NO',

  CONTACT_FORM_DESTINATION_ADDRESS: 'rkt@gbx.gi',

  GOOGLE_RECAPTCHA_SECRET: '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe',

  // The number of decimals to which to round the pre-sale token amount
  PRE_SALE_TOKEN_AMOUNT_ROUNDING_DECIMALS: '2',
  // The rounding mode - from http://mikemcl.github.io/bignumber.js/#rounding-mode - to
  // use when rounding the ETH value of the pre-sold tokens
  PRE_SALE_TOKEN_AMOUNT_ROUNDING_MODE: '1',

  // Exposing the ICO Settings
  DEBUG_EXPOSE_ICO_SETTINGS: 'NO',
}, process.env);

module.exports = env;
