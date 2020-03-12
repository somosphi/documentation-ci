const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');
const env = require('./env');

const stdout = new PrettyStream();
stdout.pipe(process.stdout);

const stderr = new PrettyStream();
stderr.pipe(process.stderr);

const logger = bunyan.createLogger({
  name: env.NAME,
  streams: [
    {
      stream: stdout,
    },
    {
      level: 'error',
      stream: stdout,
    },
  ],
});

module.exports = logger;

