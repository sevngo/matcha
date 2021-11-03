import express from 'express';
import path from 'path';
import pino from './utils/logger.js';
import usersRouter from './services/users/router.js';
import { errorHandler } from './middlewares/error.js';
import { TEST, PRODUCTION } from './utils/enums.js';

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== TEST) app.use(pino);

app.use('/api/users', usersRouter);

app.use(errorHandler);

if (process.env.NODE_ENV === PRODUCTION) {
  app.use(express.static('build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '..', '..', 'build', 'index.html'))
  );
}

export default app;
