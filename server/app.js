const express = require('express');
const path = require('path');
const usersRouter = require('./routers/users');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', usersRouter);

app.use(express.static('dist'));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'dist', 'index.html')));

module.exports = app;
