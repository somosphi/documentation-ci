const commander = require('commander');
const env = require('./env');

const program = new commander.Command();
program.version(env.VERSION);

module.exports = program;
