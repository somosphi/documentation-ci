const path = require('path');
const program = require('../program');
const logger = require('../logger');
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
      const destination = path.join('/', namespace, service, '/');
      await rm({ destination, bucket });
      process.exit(0);
    } catch (ex) {
      logger.error(ex.message);
      process.exit(1);
    }
  });
