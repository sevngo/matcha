import dotenv from 'dotenv';

export const PRODUCTION = 'production';
export const DEVELOPMENT = 'development';
export const TEST = 'test';

export const { NODE_ENV } = process.env;

const path = `.env.${NODE_ENV}`;

dotenv.config({ path });

export const {
  JWT_SECRET,
  MONGODB_URI,
  DATABASE_NAME,
  SERVER_PORT,
  SENDGRID_API_KEY,
} = process.env;

const envDevProdRequired = [
  'JWT_SECRET',
  'MONGODB_URI',
  'DATABASE_NAME',
  'SERVER_PORT',
  'SENDGRID_API_KEY',
];

const envTestRequired = ['JWT_SECRET', 'MONGODB_URI', 'DATABASE_NAME'];

const envRequired = NODE_ENV === TEST ? envTestRequired : envDevProdRequired;

const envMissing = envRequired.filter((env) => !process.env[env] && env);

if (envMissing[0])
  throw Error(`${envMissing} env variables are mandatory in ${path} file`);
