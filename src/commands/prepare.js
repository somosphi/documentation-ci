const path = require('path');
const program = require('../program');
const logger = require('../logger');
const { prepare } = require('../services/sync');

program
  .command('prepare <dir>')
  .description('Retorna todos os documentos que podem ser tratados no diretório')
  .action(async (dir) => {
    if (dir.length === 0) {
      throw new Error('dir inválido')
    }

    try {
      const files = await prepare({ dir: path.resolve(process.cwd(), dir) });
      files.map((file) => logger.info(`Arquivo encontrado: ${file}`));
      process.exit(0);
    } catch (ex) {
      logger.error(ex.message);
      process.exit(1);
    }
  });
