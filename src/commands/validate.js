const path = require('path');
const program = require('../program');
const logger = require('../logger');
const { findTypeByFilename } = require('../helpers/types');
const { runValidation } = require('../services/validate');

program
  .command('validate <input>')
  .description('Valida o arquivo de documentação')
  .option('-t, --type <type>', 'Tipo de documentação')
  .action(async (input) => {
    const data = {
      input: path.resolve(input),
      type: program.type
        ? program.type.toLowerCase()
        : findTypeByFilename(path.basename(input)),
    };

    const message = await runValidation(data);
    if (message) {
      logger.error(message);
      process.exit(1);
    }
  });
