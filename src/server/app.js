const express = require('express');
const path = require('path');
const pino = require('./utils/logger');
const usersRouter = require('./users/router');
const { errorHandler } = require('./middlewares/error');
const { NODE_ENV, TEST, PRODUCTION } = require('./utils/env');

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

module.exports = app;
