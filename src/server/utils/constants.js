const path = require('path');

const PRODUCTION = 'production';
const DEVELOPMENT = 'development';
const TEST = 'test';

const { NODE_ENV } = process.env;

require('dotenv').config({
  path: path.resolve(__dirname, '..', '..', '..', `.env.${NODE_ENV}`),
});

const {
  JWT_SECRET = 'defaultSecret',
  MONGODB_URI,
  DATABASE_NAME,
  REACT_APP_PROXY_PORT,
  SERVER_PORT,
  SENDGRID_API_KEY,
} = process.env;

// default values for testing environment

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
