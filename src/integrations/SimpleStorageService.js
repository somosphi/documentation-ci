const AWS = require('aws-sdk');
const debug = require('debug')('integrations:SimpleStorageService');
const logger = require('../logger');

const S3 = new AWS.S3({
  signatureVersion: 'v4',
  sslEnabled: true,
});

const emptyDirectory = async (bucket, prefix) => {
  debug('list objects in the directory')
  const list = await S3.listObjects({
    Bucket: bucket,
    Prefix: prefix,
  }).promise();

  if (list.Contents.length == 0) {
    debug('no objects found');
    return;
  }

  const params = {
    Bucket: bucket,
    Delete: {
      Objects: list.Contents.map(content => {
        logger.info(`Deleted ${content.Key}`);
        return { Key: content.Key };
      }),
    },
  };

  debug(`start delete ${list.Contents.length} objects`);
  await S3.deleteObjects(params)
    .promise();

  if (list.IsTruncated) {
    debug('directory is truncated');
    return emptyDirectory(bucket, prefix);
  }
  debug('directory is empty');
};

exports.emptyDirectory = emptyDirectory;

/**
 *
 * @param {String} bucket
 * @param {String} filename
 * @param {import('aws-sdk').S3.Body} content
 */
const put = (bucket, filename, content) => {
  debug(`Uploaded ${filename}`);
  return S3.upload({
    Bucket: bucket,
    Key: filename,
    Body: content,
  }).promise();
};

exports.put = put;
