const pino = require('pino-http');
const { NODE_ENV, PRODUCTION } = require('./env');

const logger = pino({
  prettyPrint: {
    levelFirst: NODE_ENV !== PRODUCTION,
  },
});

module.exports = logger;
