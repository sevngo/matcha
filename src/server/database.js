const { MongoClient } = require('mongodb');
const { usersModel } = require('./users/model');
const { MONGODB_URI, DATABASE_NAME, NODE_ENV, TEST } = require('./utils/env');
const { USERS } = require('./users/model');
const pino = require('./utils/logger');

let db;
let client;

exports.connectDb = async () => {
  client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = client.db(DATABASE_NAME);
  if (NODE_ENV !== TEST) pino.logger.info('Database connected'); // eslint-disable-line no-console
  return usersModel(db);
};

exports.disconnectDb = () => client.close();

exports.getUsers = () => db.collection(USERS);
