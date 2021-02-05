import pino from 'pino-http';

const logger = pino({
  prettyPrint: {
    levelFirst: true,
    translateTime: true,
    messageKey: 'msg',
    messageFormat: '{msg} {res.statusCode} {req.method} {req.url}',
    ignore: 'res,req,pid,hostname',
  },
});

export default logger;
