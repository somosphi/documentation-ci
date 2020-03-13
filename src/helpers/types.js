const path = require('path');

const ASYNCAPI = 'asyncapi';
exports.ASYNCAPI = ASYNCAPI;

const OPENAPI = 'openapi';
exports.OPENAPI = OPENAPI;

const AsyncAPI = Object.freeze({
  type: ASYNCAPI,
  files: ['asyncapi.yaml', 'asyncapi.yml', 'asyncapi.json'],
});

exports.AsyncAPI = AsyncAPI;

const OpenAPI = Object.freeze({
  type: OPENAPI,
  files: [
    ...['swagger.yaml', 'swagger.yml', 'swagger.json'],
    ...['openapi.yaml', 'openapi.yml', 'openapi.json'],
  ],
});

exports.OpenAPI = OpenAPI;

/**
 *
 * @param {String} filename
 */
const findTypeByFilename = (filename) => {
  const string = filename.toLowerCase();

  if (OpenAPI.files.includes(string)) {
    return OpenAPI.type;
  }

  if (AsyncAPI.files.includes(string)) {
    return AsyncAPI.type;
  }

  return null;
};

exports.findTypeByFilename = findTypeByFilename;

/**
 *
 * @param {String} filename
 */
const findByFilename = (filename) => {
  const file = filename.toLowerCase();

  if (OpenAPI.files.includes(file)) {
    return filename;
  }

  if (AsyncAPI.files.includes(file)) {
    return filename;
  }

  return null;
};

exports.findByFilename = findByFilename;

/**
 *
 * @param {String} filename
 */
const findJSONByFilename = (filename) => {
  const file = filename.toLowerCase();
  const ext = path.extname(file)

  if (ext !== '.json') {
    return null;
  }

  return findByFilename(filename);
};

exports.findJSONByFilename = findJSONByFilename;

