const { MongoClient } = require('mongodb');
const { usersModel, USERS } = require('./models/users');

const url = 'mongodb://127.0.0.1:27017';
const databaseName = 'matcha';
let db;

const connectDb = async () => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  db = client.db(databaseName);
  console.log('Database connected');
  return await usersModel(db);
};

const Users = () => db.collection(USERS);

module.exports = { connectDb, Users };
