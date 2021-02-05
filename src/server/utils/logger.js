import pino from 'pino-http';
import { PRODUCTION, NODE_ENV } from './env.js';

const logger = pino({
  prettyPrint: {
    levelFirst: NODE_ENV !== PRODUCTION,
  },
});

export default logger;
