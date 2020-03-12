// @ts-nocheck
const project = require('../package.json');

module.exports = Object.freeze({
  NAME: project.name,
  VERSION: project.version,
  DESCRIPTION: project.description,
});
