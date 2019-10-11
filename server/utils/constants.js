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

exports.STRING = { bsonType: 'string' };
exports.OBJECTID = { bsonType: 'objectId' };
exports.DATE = { bsonType: 'date' };
exports.BOOL = { bsonType: 'bool' };
exports.ARRAY = { bsonType: 'array' };
exports.OBJECT = { bsonType: 'object' };
exports.BINDATA = { bsonType: 'binData' };
