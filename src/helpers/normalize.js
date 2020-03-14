const path = require('path');
const fs = require('fs');
const { findTypeByFilename } = require('./types');

/**
 * @param {String} string
 * @returns {String}
 */
const bucket = (string) => {
  if (string.startsWith('s3://')) {
    const url = new URL(string);
    return url.hostname;
  }

  return string;
};

exports.bucket = bucket;

/**
 * @param {String} field
 * @param {String} dir
 * @returns {String}
 */
const dir = (field, dir) => {
  const location = path.resolve(process.cwd(), dir);
  const info = fs.lstatSync(location);

  if (info.isDirectory()) {
    return location;
  }

  throw Error(`${field} is not a directory`);
};

exports.dir = dir;

/**
 * @param {String} field
 * @param {String} file
 * @returns {String}
 */
const file = (field, file) => {
  const location = path.resolve(process.cwd(), file);
  const info = fs.lstatSync(location);

  if (info.isFile()) {
    return location;
  }

  throw Error(`${field} is not a file`);
};

exports.file = file;

/**
 * @param {String} namespace
 * @param {String} service
 * @returns {String}
 */
const destination = (namespace, service) => {
  return path.join('/', namespace, service, '/');
};

exports.destination = destination;

/**
 * @param {String} input
 * @param {String} [type]
 * @returns {String}
 */
const type = (input, type = null) => {
  if (type) {
    return type.toLowerCase();
  }

  return findTypeByFilename(path.basename(input));
};

exports.type = type;
