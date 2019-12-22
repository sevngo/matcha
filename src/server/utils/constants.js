const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '..', '..', '..', `.env.${process.env.NODE_ENV}`),
});

const {
  JWT_SECRET,
  NODE_ENV,
  MONGODB_URL,
  DATABASE_NAME,
  SERVER_PORT,
  SENDGRID_API_KEY,
} = process.env;

exports.JWT_SECRET = JWT_SECRET || 'mySecret';
exports.NODE_ENV = NODE_ENV;
exports.MONGODB_URL = MONGODB_URL;
exports.DATABASE_NAME = DATABASE_NAME;
exports.SERVER_PORT = SERVER_PORT;
exports.SENDGRID_API_KEY = SENDGRID_API_KEY;

exports.DEVELOPMENT = 'development';
exports.PRODUCTION = 'production';
exports.TEST = 'test';

exports.USERS = 'users';
