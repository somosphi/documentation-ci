#!/usr/bin/env node

const program = require('./program');
const logger = require('./logger');

require('./commands/validate');
require('./commands/bundle');
require('./commands/sync');
require('./commands/cp');
require('./commands/rm');
require('./commands/prepare');

if (process.argv.length === 2) {
  process.argv.push('-h')
}

program
  .command('*')
  .action(() => {
    logger.error('Comando não encontrado');
    process.exit(1);
  });

program.parse(process.argv);
