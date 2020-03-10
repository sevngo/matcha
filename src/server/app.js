const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const usersRouter = require('./users/router');
const { errorHandler } = require('./middlewares/error');
const { NODE_ENV, DEVELOPMENT, PRODUCTION } = require('./utils/constants');

const app = express();

app.use(express.json());

if (NODE_ENV === DEVELOPMENT) app.use(morgan('dev'));

app.use(helmet());

app.use('/api/users', usersRouter);

app.use(errorHandler);

if (NODE_ENV === PRODUCTION) {
  app.use(express.static('build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '..', '..', 'build', 'index.html')),
  );
}

module.exports = app;
