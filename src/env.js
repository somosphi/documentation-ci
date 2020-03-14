require('dotenv').config();
const AWS = require('aws-sdk');
const project = require('../package.json');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
});

module.exports = Object.freeze({
  NAME: project.name,
  VERSION: project.version,
  DESCRIPTION: project.description,
});
