const Redis = require('ioredis');

const env = require('../config/env');

const KEY_PREFIX = env.CACHE_REDIS_KEY_PREFIX || 'gbx:';
const ENV_PREFIX = (env.NODE_ENV || '$env$').toLowerCase();
const FULL_PREFIX = `${KEY_PREFIX}${ENV_PREFIX}:`;

const redis = new Redis({
  port: parseInt(env.CACHE_REDIS_PORT || '6379', 10),
  host: env.CACHE_REDIS_HOST,
  family: 4,
  password: env.CACHE_REDIS_PASSWORD || undefined,
  db: parseInt(env.CACHE_REDIS_DB || '0', 10),
  keyPrefix: FULL_PREFIX,
});

module.exports = redis;
