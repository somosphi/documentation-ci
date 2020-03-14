const program = require('../program');
const logger = require('../logger');
const normalize = require('../helpers/normalize');
const { sync } = require('../services/sync');

program
  .command('sync <bucket> <namespace> <service> <dir>')
  .action(async (bucket, namespace, service, dir) => {
    try {
      await sync({
        dir: normalize.dir('dir', dir),
        bucket: normalize.bucket(bucket),
        destination: normalize.destination(namespace, service),
      });

      process.exit(0);
    } catch (ex) {
      logger.error(ex);
      process.exit(1);
    }
  });
