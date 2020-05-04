const { ObjectID } = require('mongodb');
const faker = require('faker');
const bcrypt = require('bcryptjs');
const { connectDb, getUsers, disconnectDb } = require('../src/server/database');

const insertData = async () => {
  const genders = ['female', 'male'];
  const today = new Date();
  const birthDateMin = new Date(today.getFullYear() - 50, today.getMonth(), today.getDate());
  const birthDateMax = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  const newUser = {
    username: 'admin',
    birthDate: faker.date.between(birthDateMin, birthDateMax),
    email: faker.internet.email(),
    gender: faker.random.arrayElement(genders),
    address: {
      type: 'Point',
      name: faker.address.streetAddress(),
      coordinates: [parseFloat(faker.address.longitude()), parseFloat(faker.address.latitude())],
    },
    password: bcrypt.hashSync('admin', 8),
    _id: ObjectID(),
    emailVerified: true,
  };
  await getUsers().insertOne(newUser);
  console.log('Done. Username and password: "admin"');
};

(async () => {
  try {
    await connectDb();
    await insertData();
    await disconnectDb();
    process.exit();
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
  }
})();
