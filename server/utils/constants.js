const {
  JWT_SECRET,
  DEVSERVER_PORT,
  NODE_ENV,
  MONGODB_URL,
  DATABASE_NAME,
  PORT,
  SENDGRID_API_KEY,
} = process.env;

const string = { bsonType: 'string' };
const objectId = { bsonType: 'objectId' };
const date = { bsonType: 'date' };
const bool = { bsonType: 'bool' };
const array = { bsonType: 'array' };
const object = { bsonType: 'object' };

module.exports = {
  JWT_SECRET,
  DEVSERVER_PORT,
  NODE_ENV,
  MONGODB_URL,
  DATABASE_NAME,
  PORT,
  SENDGRID_API_KEY,
  string,
  objectId,
  date,
  bool,
  array,
  object,
};
