const program = require('../program');
const logger = require('../logger');
const normalize = require('../helpers/normalize');
const { runValidation } = require('../services/validate');

program
  .command('validate <input>')
  .description('Valida o arquivo de documentação')
  .option('-t, --type <type>', 'Tipo de documentação')
  .action(async (input) => {
    try {
      await runValidation({
        input: normalize.file('input', input),
        type: normalize.type(input, program.type)
      });

      process.exit(0);
    } catch (ex) {
      logger.error(ex.message);
      process.exit(1);
    }
  });
