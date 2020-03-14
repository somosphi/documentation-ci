const fs = require('fs');
const debug = require('debug')('services:validate');
const asyncapi = require('asyncapi-parser');
const swagger = require('swagger-parser');
const { ASYNCAPI, OPENAPI } = require('../helpers/types');

/**
 * @param {Object} param
 * @param {String} param.input
 * @param {String} param.type
 */
const runValidation = async ({ input, type }) => {
  debug(`start validate file ${input}`);
  switch (type) {
    case OPENAPI:
      debug('file type is openapi');
      await swagger.validate(input);
      break;
    case ASYNCAPI:
      debug('file type is asyncapi');
      const content = fs.readFileSync(input)
        .toString('utf-8');
      await asyncapi.parse(content, {
        path: input,
      });
      break;
    default: throw('Tipo não suportado');
  }

  return null;
};

exports.runValidation = runValidation;
