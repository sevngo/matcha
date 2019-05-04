const {
  JWT_SECRET,
  DEVSERVER_PORT,
  NODE_ENV,
  MONGODB_URL,
  DATABASE_NAME,
  PORT,
  SENDGRID_API_KEY,
} = process.env;

const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const STRING = { bsonType: 'string' };
const OBJECTID = { bsonType: 'objectId' };
const DATE = { bsonType: 'date' };
const BOOL = { bsonType: 'bool' };
const ARRAY = { bsonType: 'array' };
const OBJECT = { bsonType: 'object' };
const BINDATA = { bsonType: 'binData' };

module.exports = {
  JWT_SECRET,
  DEVSERVER_PORT,
  NODE_ENV,
  MONGODB_URL,
  DATABASE_NAME,
  PORT,
  SENDGRID_API_KEY,
  DEVELOPMENT,
  PRODUCTION,
  STRING,
  OBJECTID,
  DATE,
  BOOL,
  ARRAY,
  OBJECT,
  BINDATA,
};
