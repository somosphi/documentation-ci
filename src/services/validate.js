const fs = require('fs');
const asyncapi = require('asyncapi-parser');
const swagger = require('swagger-parser');
const { ASYNCAPI, OPENAPI } = require('../helpers/types');

/**
 * @param {Object} param
 * @param {String} param.input
 * @param {String} param.type
 */
const runValidation = async ({ input, type }) => {
  try {
    switch (type) {
      case OPENAPI:
        await swagger.validate(input);
        break;
      case ASYNCAPI:
        const content = fs.readFileSync(input)
          .toString('utf-8');
        await asyncapi.parse(content, {
          path: input,
        });
        break;
      default: throw('Tipo não suportado');
    }
  } catch (ex) {
    return ex.message;
  }

  return null;
};

exports.runValidation = runValidation;
