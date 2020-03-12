const fs = require('fs');
const path = require('path');
const asyncapi = require('asyncapi-parser');
const swagger = require('swagger-parser');
const { ASYNCAPI, OPENAPI } = require('../helpers/types');

/**
 * @param {Object} param
 * @param {String} param.input
 * @param {String} param.output
 * @param {String} param.type
 */
const runBundle = async ({ input, output, type }) => {
  try {
    let json = null;

    switch (type) {
      case OPENAPI:
        json = await swagger.parse(input);
        break;
      case ASYNCAPI:
        const content = fs.readFileSync(input)
          .toString('utf-8');
        const { _json } = await asyncapi.parse(content, {
          path: input,
        });
        json = _json;
        break;
      default: throw('Tipo não suportado');
    }

    const destination = path.join(output, `${type}.json`);
    fs.writeFileSync(destination, JSON.stringify(json))
  } catch (ex) {
    return ex.message;
  }

  return null;
};

exports.runBundle = runBundle;
