const program = require('../program');
const logger = require('../logger');

program
  .command('sync')
  .action(() => {
    logger.error('Comando não implementado');
    process.exit(1);
  });
