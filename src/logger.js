const bunyan = require('bunyan');
const PrettyStream = require('bunyan-prettystream');
const env = require('./env');

const stdout = new PrettyStream();
stdout.pipe(process.stdout);

const logger = bunyan.createLogger({
  name: env.NAME,
  streams: [
    {
      stream: stdout,
    },
  ],
});

module.exports = logger;

