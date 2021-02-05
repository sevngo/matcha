import dotenv from 'dotenv';

export const PRODUCTION = 'production';
export const DEVELOPMENT = 'development';
export const TEST = 'test';

export const { NODE_ENV } = process.env;

dotenv.config({
  path: `.env.${NODE_ENV}`,
});

export const {
  JWT_SECRET = 'defaultSecret',
  MONGODB_URI,
  DATABASE_NAME,
  SERVER_PORT,
  SENDGRID_API_KEY,
} = process.env;

// default values for testing environment
