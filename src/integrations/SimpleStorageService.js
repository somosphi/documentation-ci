const AWS = require('aws-sdk');
const logger = require('../logger');

const S3 = new AWS.S3();

const emptyDirectory = async (bucket, prefix) => {
  const list = await S3.listObjects({
    Bucket: bucket,
    Prefix: prefix,
  }).promise();

  if (list.Contents.length == 0) {
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

  await S3.deleteObjects(params)
    .promise();

  if (list.IsTruncated) {
    return emptyDirectory(bucket, prefix);
  }
};

exports.emptyDirectory = emptyDirectory;

/**
 *
 * @param {String} bucket
 * @param {String} filename
 * @param {import('aws-sdk').S3.Body} content
 */
const put = (bucket, filename, content) => {
  logger.info(`Uploaded ${filename}`);
  return S3.upload({
    Bucket: bucket,
    Key: filename,
    Body: content,
  }).promise();
};

exports.put = put;
