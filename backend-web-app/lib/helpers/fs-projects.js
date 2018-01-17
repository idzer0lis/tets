require('../../node-environment');

const fsExtra = require('fs-extra-promise').usePromise(Promise);
const S3fs = require('s3fs');

const env = require('../config/env');

const fsImpl = env.PROJECT_STORAGE_AMAZON_S3_ENABLED === 'YES'
  ? Promise.promisifyAll(new S3fs(env.PROJECT_STORAGE_AMAZON_S3_BUCKET_NAME, {
    endpoint: env.PROJECT_STORAGE_AMAZON_S3_ENDPOINT || undefined,
    region: env.PROJECT_STORAGE_AMAZON_S3_REGION || undefined,
    sslEnabled: env.PROJECT_STORAGE_AMAZON_S3_SSL_ENABLED === 'YES',
    s3ForcePathStyle: env.PROJECT_STORAGE_AMAZON_S3_FORCE_PATH_STYLE === 'YES',
    accessKeyId: env.PROJECT_STORAGE_AMAZON_S3_ACCESS_KEY_ID,
    secretAccessKey: env.PROJECT_STORAGE_AMAZON_S3_SECRET_ACCESS_KEY,
    signatureVersion: 'v4',
  }))
  : fsExtra;

module.exports = fsImpl;
