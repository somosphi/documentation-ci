const path = require('path');
const program = require('../program');
const logger = require('../logger');
const { findTypeByFilename } = require('../helpers/types');
const { runBundle } = require('../services/bundle');

program
  .command('bundle <input> <output>')
  .description('Unifica os arquivos em um único arquivo json e salva em um diretório')
  .option('-t, --type <type>', 'Tipo de documentação')
  .action(async (input, output) => {
    const { dir, base, ext } = path.parse(path.resolve(output));

    const data = {
      input: path.resolve(input),
      output: ext === '' ? path.join(dir, base) : dir,
      type: program.type
        ? program.type.toLowerCase()
        : findTypeByFilename(path.basename(input)),
    };

    const message = await runBundle(data);
    if (message) {
      logger.error(message);
      process.exit(1);
    }
  });
