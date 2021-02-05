import mongodb from 'mongodb';
import { usersModel } from './users/model.js';
import { TEST } from './utils/env.js';
import { USERS } from './users/model.js';
import pino from './utils/logger.js';

let db;
let client;

export const connectDb = async () => {
  client = await mongodb.MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = client.db(process.env.DATABASE_NAME);
  if (process.env.NODE_ENV !== TEST)
    pino.logger.info(`database connected to ${process.env.MONGODB_URI}`); // eslint-disable-line no-console
  return usersModel(db);
};

export const disconnectDb = () => client.close();

export const getUsers = () => db.collection(USERS);
