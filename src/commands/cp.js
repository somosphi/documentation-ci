const path = require('path');
const program = require('../program');
const logger = require('../logger');
const { cp } = require('../services/sync');

program
  .command('cp <bucket> <namespace> <service> <dir>')
  .description('Remove todos os arquivos do storage')
  .action(async (bucket, namespace, service, dir) => {
    if (bucket.length === 0 ) {
      throw new Error('bucket inválido')
    }

    if (namespace.length === 0 ) {
      throw new Error('namespace inválido')
    }

    if (service.length === 0) {
      throw new Error('service inválido')
    }

    if (dir.length === 0) {
      throw new Error('dir inválido')
    }

    try {
      const destination = path.join('/', namespace, service, '/');
      await cp({ dir: path.resolve(process.cwd(), dir), destination, bucket });
      process.exit(0);
    } catch (ex) {
      logger.error(ex.message);
      process.exit(1);
    }
  });
