const { MongoClient } = require('mongodb');
const { usersModel, USERS } = require('./models/users');
const { MONGODB_URL, DATABASE_NAME } = require('./utils/constants');

let db;
let client;

const connectDb = async () => {
  client = await MongoClient.connect(MONGODB_URL, { useNewUrlParser: true });
  db = client.db(DATABASE_NAME);
  console.log('Database connected'); // eslint-disable-line no-console
  return await usersModel(db);
};

const disconnectDb = () => client.close();

const Users = () => db.collection(USERS);

module.exports = { connectDb, Users, disconnectDb };
