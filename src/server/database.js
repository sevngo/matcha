import mongodb from 'mongodb';
import { usersModel } from './users/model.js';
import { TEST } from './utils/enums.js';
import { USERS_COLLECTION } from './utils/enums.js';
import pino from './utils/logger.js';

let db;
let client;

export const connectDb = async () => {
  const { NODE_ENV, MONGODB_URI, DATABASE_NAME } = process.env;
  client = await mongodb.MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = client.db(DATABASE_NAME);
  if (NODE_ENV !== TEST)
    pino.logger.info(`database connected to ${MONGODB_URI}`); // eslint-disable-line no-console
  return usersModel(db);
};

export const disconnectDb = () => client.close();

export const getUsers = () => db.collection(USERS_COLLECTION);
