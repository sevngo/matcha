const express = require('express');
const path = require('path');
const morgan = require('morgan');
const usersRouter = require('./routers/users');
const { NODE_ENV, DEVELOPMENT, PRODUCTION } = require('./utils/constants');

const app = express();

if (NODE_ENV === DEVELOPMENT) app.use(morgan('dev'));

app.use(express.json());

app.use('/api/users', usersRouter);

if (NODE_ENV === PRODUCTION) {
  app.use(express.static('dist'));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'dist', 'index.html')));
}

module.exports = app;
