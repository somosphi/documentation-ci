const commander = require('commander');
const debug = require('debug');
const env = require('./env');

const program = new commander.Command();
program.version(env.VERSION);
program.option('-d, --debug', 'Exibe informações extras', '');

program.on('option:debug', () => {
  debug.enable('*');
});

program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
});

module.exports = program;
