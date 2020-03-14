const program = require('../program');
const logger = require('../logger');
const normalize = require('../helpers/normalize');
const { cp } = require('../services/sync');

program
  .command('cp <bucket> <namespace> <service> <dir>')
  .description('Remove todos os arquivos do storage')
  .action(async (bucket, namespace, service, dir) => {
    try {
      await cp({
        dir: normalize.dir('dir', dir),
        destination: normalize.destination(namespace, service),
        bucket: normalize.bucket(bucket),
      });
      process.exit(0);
    } catch (ex) {
      logger.error(ex.message);
      process.exit(1);
    }
  });
