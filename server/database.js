const { MongoClient } = require('mongodb');
const { usersModel } = require('./models/users');
const { MONGODB_URL, DATABASE_NAME } = require('./utils/constants');
const { USERS } = require('./utils/constants');

let db;
let client;

exports.connectDb = async () => {
  client = await MongoClient.connect(MONGODB_URL, { useNewUrlParser: true });
  db = client.db(DATABASE_NAME);
  console.log('Database connected'); // eslint-disable-line no-console
  return await usersModel(db);
};

exports.disconnectDb = () => client.close();

exports.Users = () => db.collection(USERS);
