const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { runBundle } = require('../services/bundle');
const { runValidation } = require('../services/validate');
const { findJSONByFilename, findByFilename, findTypeByFilename } = require('../helpers/types');
const SimpleStorageService = require('../integrations/SimpleStorageService');

/**
 * @param {Object} param
 * @param {String} param.destination
 * @param {String} param.bucket
 */
const rm = async ({ destination, bucket }) => {
  await SimpleStorageService.emptyDirectory(bucket, destination)
};

exports.rm = rm;

/**
 * @param {Object} param
 * @param {String} param.dir
 * @param {String} param.destination
 * @param {String} param.bucket
 */
const cp = async ({ dir, destination, bucket }) => {
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

/**
 * @param {Object} param
 * @param {String} param.dir
 */
const prepare = async ({ dir }) => {
  const rawfiles = glob.sync('**/*', {
    cwd: dir,
  });

  const files = rawfiles.filter((file) => {
    const ext = path.extname(file);

    if (ext === '') {
      return false;
    }

    return findByFilename(file) !== null;
  });

  return files;
};

exports.prepare = prepare;

/**
 * @param {Object} param
 * @param {String} param.dir
 * @param {String} param.destination
 * @param {String} param.bucket
 */
const sync = async ({
  dir,
  bucket,
  destination,
}) => {
  const tasks = await prepare({ dir });

  for (let index = 0; index < tasks.length; index += 1) {
    const input = path.join(dir, tasks[index]);
    const type = findTypeByFilename(input);
    await runValidation({ input, type });
    await runBundle({ input, type, output: dir });
  }

  await rm({ bucket, destination });
  await cp({ bucket, destination, dir });
};

exports.sync = sync;
