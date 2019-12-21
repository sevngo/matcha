const { ObjectID } = require('mongodb');
const faker = require('faker');
const { times } = require('ramda');
const bcrypt = require('bcryptjs');
const { connectDb, Users } = require('../database');

const insertData = async () => {
  const genders = ['female', 'male'];
  const today = new Date();
  const birthDateMin = new Date(today.getFullYear() - 50, today.getMonth(), today.getDate());
  const birthDateMax = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  const makeRandomUser = () => ({
    username: faker.internet.userName(),
    birthDate: faker.date.between(birthDateMin, birthDateMax),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    gender: faker.random.arrayElement(genders),
    address: {
      type: 'Point',
      name: faker.address.streetAddress(),
      coordinates: [parseFloat(faker.address.longitude()), parseFloat(faker.address.latitude())],
    },
    password: bcrypt.hashSync(faker.internet.password(), 8),
    _id: ObjectID(),
    usersLiked: [],
    usersBlocked: [],
    emailVerified: true,
  });
  const newUsers = times(makeRandomUser, 20);
  await Users().insertMany(newUsers);
  console.log('Data inserted in the database');
};

(async () => {
  try {
    await connectDb();
    await insertData();

    process.exit();
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
  }
})();
