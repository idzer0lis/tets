/**
 * Created by sandrastoicescu on 30/11/2017.
 */

const path = require('path');
const fs = require('fs-extra');
const crypto = require('crypto');
const uuid = require('uuid');
const env = require('../config/env');
const logger = require('../helpers/logger');

const multer = require('multer');

const DEFAULT_MAX_FILE_SIZE = 30 * 1024 * 1024;

function fileFilter(req, file, cb) {
  const filetypes = /^\.(png|jpe?g|tiff?|pdf)$/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (!extname) {
    logger.warn('Could not save KYC file', {
      mimetype: file.mimetype,
      originalname: file.originalname,
    });
    return cb('Please upload a png, jpg/jpeg, tif/tiff or pdf file.', false);
  }

  return cb(null, true);
}

function setFilename(req, file, callback) { // multer option flavour
  return crypto.pseudoRandomBytes(16, (err, raw) => {
    if (err) return callback(err);
    return callback(null, (`${raw.toString('hex')}-${uuid.v4()}${path.extname(file.originalname || '')}`).toLowerCase());
  });
}

let storage;
if (!env.STORAGE_TEMP_PATH) {
  logger.warn('Using memory storage for Multer');
  storage = multer.memoryStorage();
} else {
  fs.ensureDirSync(env.STORAGE_TEMP_PATH);
  storage = multer.diskStorage({ destination: env.STORAGE_TEMP_PATH, filename: setFilename });
}

const limits = {
  files: 1,
  fileSize: parseInt(env.KYC_STORAGE_MAX_FILE_SIZE || `${DEFAULT_MAX_FILE_SIZE}`, 10),
};

if (env.PROJECT_FILES_STORAGE_ROOT_PATH) {
  if (env.PROJECT_STORAGE_AMAZON_S3_ENABLED !== 'YES') {
    fs.ensureDirSync(env.PROJECT_FILES_STORAGE_ROOT_PATH);
  }
} else {
  logger.warn('Project files storage root path not configured');
}

if (env.KYC_STORAGE_PATH) {
  if (env.KYC_STORAGE_AMAZON_S3_ENABLED !== 'YES') {
    fs.ensureDirSync(env.KYC_STORAGE_PATH);
  }
} else {
  logger.warn('KYC storage path not configured');
}

module.exports = { storage, fileFilter, limits };
