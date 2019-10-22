const express = require('express');
const path = require('path');
const morgan = require('morgan');
const usersRouter = require('./users/router');
const { errorHandler } = require('./middlewares/error');
const { NODE_ENV, DEVELOPMENT, PRODUCTION } = require('./utils/constants');

const app = express();

app.use(express.json());

if (NODE_ENV === DEVELOPMENT) app.use(morgan('dev'));

app.use('/api/users', usersRouter);

app.use(errorHandler);

if (NODE_ENV === PRODUCTION) {
  app.use(express.static('dist'));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'dist', 'index.html')));
}

module.exports = app;
