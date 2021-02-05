import express from 'express';
import path from 'path';
import pino from './utils/logger.js';
import usersRouter from './users/router.js';
import { errorHandler } from './middlewares/error.js';
import { TEST, PRODUCTION, NODE_ENV } from './utils/env.js';

const app = express();

app.use(express.json());

if (NODE_ENV !== TEST) app.use(pino);

app.use('/api/users', usersRouter);

app.use(errorHandler);

if (NODE_ENV === PRODUCTION) {
  app.use(express.static('build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '..', '..', 'build', 'index.html'))
  );
}

export default app;
