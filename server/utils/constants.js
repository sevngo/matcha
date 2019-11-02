const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '..', '..', `.env.${process.env.NODE_ENV}`),
});

const {
  JWT_SECRET,
  DEVSERVER_PORT,
  NODE_ENV,
  MONGODB_URL,
  DATABASE_NAME,
  PORT,
  SENDGRID_API_KEY,
} = process.env;

exports.JWT_SECRET = JWT_SECRET || 'mySecret';
exports.DEVSERVER_PORT = DEVSERVER_PORT;
exports.NODE_ENV = NODE_ENV;
exports.MONGODB_URL = MONGODB_URL;
exports.DATABASE_NAME = DATABASE_NAME;
exports.PORT = PORT;
exports.SENDGRID_API_KEY = SENDGRID_API_KEY;

exports.DEVELOPMENT = 'development';
exports.PRODUCTION = 'production';
exports.TEST = 'test';

exports.USERS = 'users';
