const path = require('path');
const program = require('../program');
const logger = require('../logger');
const { sync } = require('../services/sync');

program
  .command('sync <bucket> <namespace> <service> <dir>')
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
      await sync({
        dir: path.resolve(process.cwd(), dir),
        bucket,
        destination: path.join('/', namespace, service, '/'),
      });

      process.exit(0);
    } catch (ex) {
      logger.error(ex.message);
      process.exit(1);
    }
  });
