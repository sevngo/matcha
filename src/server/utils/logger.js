import pino from 'pino-http';

const logger = pino({
  prettyPrint: {
    translateTime: true,
    messageKey: 'msg',
    messageFormat: '{msg} {res.statusCode} {req.method} {req.url}',
    ignore: 'res,req,pid,hostname',
  },
});

export default logger;
