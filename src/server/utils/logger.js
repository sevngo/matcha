import pino from 'pino-http';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      levelFirst: true,
      translateTime: 'HH:MM:ss.l o',
      messageKey: 'msg',
      messageFormat: '{msg} {res.statusCode} {req.method} {req.url}',
      ignore: 'pid,hostname',
      hideObject: true,
    },
  },
});

export default logger;
