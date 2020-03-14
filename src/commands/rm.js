const program = require('../program');
const logger = require('../logger');
const normalize = require('../helpers/normalize');
const { rm } = require('../services/sync');

program
  .command('rm <bucket> <namespace> <service>')
  .description('Remove todos os arquivos do storage')
  .action(async (bucket, namespace, service) => {
    if (bucket.length === 0 ) {
      throw new Error('bucket inválido')
    }

    if (namespace.length === 0 ) {
      throw new Error('namespace inválido')
    }

    if (service.length === 0) {
      throw new Error('service inválido')
    }

    try {
      await rm({
        destination: normalize.destination(namespace, service),
        bucket: normalize.bucket(bucket),
      });
      process.exit(0);
    } catch (ex) {
      logger.error(ex.message);
      process.exit(1);
    }
  });
