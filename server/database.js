const { MongoClient } = require('mongodb');
const { usersModel, USERS } = require('./models/users');

const url = process.env.MONGODB_URL;
const databaseName = process.env.DATABASE_NAME;
let db;

const connectDb = async () => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  db = client.db(databaseName);
  console.log('Database connected'); // eslint-disable-line no-console
  return await usersModel(db);
};

const Users = () => db.collection(USERS);

module.exports = { connectDb, Users };
