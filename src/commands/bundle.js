const program = require('../program');
const logger = require('../logger');
const normalize = require('../helpers/normalize');
const { runBundle } = require('../services/bundle');

program
  .command('bundle <input> <output>')
  .description('Unifica os arquivos em um único arquivo json e salva em um diretório')
  .option('-t, --type <type>', 'Tipo de documentação')
  .action(async (input, output) => {
    try {
      await runBundle({
        input: normalize.file('input', input),
        output: normalize.dir('output', output),
        type: normalize.type(input, program.type),
      });

      process.exit(0);
    } catch (ex) {
      logger.error(ex.message);
      process.exit(1);
    }
  });
