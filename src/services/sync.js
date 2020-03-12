const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { findJSONByFilename } = require('../helpers/types');
const SimpleStorageService = require('../integrations/SimpleStorageService');

/**
 * @param {Object} param
 * @param {String} param.source
 * @param {String} param.bucket
 */
const rm = async ({ source, bucket }) => {
  await SimpleStorageService.emptyDirectory(bucket, source)
};

exports.rm = rm;

/**
 * @param {Object} param
 * @param {String} param.dir
 * @param {String} param.destination
 * @param {String} param.bucket
 */
const cp = async ({ dir, destination, bucket }) => {
  console.log(dir)
  const rawfiles = glob.sync('**/*', {
    cwd: dir,
  });

  const ignore = [
    '.yaml',
    '.yml',
    '.json',
  ];

  const files = rawfiles.filter((file) => {
    const ext = path.extname(file);

    if (ext === '') {
      return false;
    }

    if (ext === '.json') {
      if (findJSONByFilename(file)) {
        return true;
      }
    }

    return !ignore.includes(ext);
  });

  const uploads = files.map(async (file) => {
    const fullpath = path.resolve(dir, file);
    const key = path.join(destination, file);
    const content = fs.readFileSync(fullpath);
    return SimpleStorageService.put(bucket, key, content);
  });

  await Promise.all(uploads);
};

exports.cp = cp;

const prepare = async () => {
  // TODO: implementar
};

exports.prepare = prepare;

const sync = async () => {
  // TODO: implementar
};

exports.sync = sync;
