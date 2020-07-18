const faker = require('faker');
const bcrypt = require('bcryptjs');
const { ObjectID } = require('mongodb');
const { createToken } = require('../../../utils/functions');

const genders = ['female', 'male'];
const today = new Date();
const birthDateMin = new Date(
  today.getFullYear() - 50,
  today.getMonth(),
  today.getDate()
);
const birthDateMax = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
);

const userOnePassword = faker.internet.password();
const userOneId = faker.random.alphaNumeric(12);
const userOneToken = createToken({ _id: userOneId });

const userOne = {
  username: faker.internet.userName(),
  birthDate: faker.date.between(birthDateMin, birthDateMax),
  email: faker.internet.email(),
  gender: faker.random.arrayElement(genders),
  address: {
    type: 'Point',
    name: faker.address.streetAddress(),
    coordinates: [
      parseFloat(faker.address.longitude()),
      parseFloat(faker.address.latitude()),
    ],
  },
  password: bcrypt.hashSync(userOnePassword, 8),
  _id: ObjectID(userOneId),
  emailVerified: true,
};

const userTwo = {
  username: faker.internet.userName(),
  birthDate: faker.date.between(birthDateMin, birthDateMax),
  email: faker.internet.email(),
  gender: 'male',
  address: {
    type: 'Point',
    name: faker.address.streetAddress(),
    coordinates: [
      parseFloat(faker.address.longitude()),
      parseFloat(faker.address.latitude()),
    ],
  },
  password: faker.internet.password(),
  _id: ObjectID(),
};

const newUser = {
  username: faker.internet.userName(),
  birthDate: faker.date.past(),
  email: faker.internet.email(),
  gender: faker.random.arrayElement(genders),
  address: {
    type: 'Point',
    name: faker.address.streetAddress(),
    coordinates: [
      parseFloat(faker.address.longitude()),
      parseFloat(faker.address.latitude()),
    ],
  },
  password: faker.internet.password(),
};

module.exports = {
  userOne,
  userTwo,
  userOnePassword,
  newUser,
  userOneId,
  userOneToken,
};
