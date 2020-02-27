const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '..', '..', '..', `.env.${process.env.NODE_ENV}`),
});

const {
  JWT_SECRET = 'mySecret',
  NODE_ENV,
  MONGODB_URI,
  DATABASE_NAME,
  REACT_APP_PROXY_PORT,
  SERVER_PORT,
  SENDGRID_API_KEY,
} = process.env;

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
const TEST = 'test';

const USERS = 'users';

module.exports = {
  DEVELOPMENT,
  PRODUCTION,
  TEST,
  JWT_SECRET,
  NODE_ENV,
  MONGODB_URI,
  DATABASE_NAME,
  SERVER_PORT,
  SENDGRID_API_KEY,
  REACT_APP_PROXY_PORT,
  USERS,
};
