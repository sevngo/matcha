const faker = require('faker');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const { JWT_SECRET } = require('../../utils/constants');

const initialPassword = faker.internet.password();
const initialId = faker.random.alphaNumeric(12);

const userOne = {
  username: faker.internet.userName(),
  birthDate: faker.date.past(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  gender: 'male',
  address: {
    type: 'Point',
    name: faker.address.streetAddress(),
    coordinates: [parseFloat(faker.address.longitude()), parseFloat(faker.address.latitude())],
  },
  password: bcrypt.hashSync(initialPassword, 8),
  _id: ObjectID(initialId),
  usersDisliked: [],
  emailVerified: true,
  token: jwt.sign({ _id: initialId }, JWT_SECRET),
};

const userTwo = {
  username: faker.internet.userName(),
  birthDate: faker.date.past(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  gender: 'male',
  address: {
    type: 'Point',
    name: faker.address.streetAddress(),
    coordinates: [parseFloat(faker.address.longitude()), parseFloat(faker.address.latitude())],
  },
  password: bcrypt.hashSync(initialPassword, 8),
  _id: ObjectID(),
  usersDisliked: [],
  emailVerified: true,
};

const newUser = {
  username: faker.internet.userName(),
  birthDate: faker.date.past(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  gender: 'male',
  address: {
    type: 'Point',
    name: faker.address.streetAddress(),
    coordinates: [parseFloat(faker.address.longitude()), parseFloat(faker.address.latitude())],
  },
  password: faker.internet.password(),
};

module.exports = {
  userOne,
  userTwo,
  initialPassword,
  newUser,
  initialId,
};
