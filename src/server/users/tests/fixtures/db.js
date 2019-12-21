const faker = require('faker');
const bcrypt = require('bcryptjs');
const { ObjectID } = require('mongodb');
const { createToken } = require('../../../utils/functions');

const genders = ['female', 'male'];
const today = new Date();
const birthDateMin = new Date(today.getFullYear() - 50, today.getMonth(), today.getDate());
const birthDateMax = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

const initialPassword = faker.internet.password();
const initialId = faker.random.alphaNumeric(12);
const userOneToken = createToken({ _id: initialId });

const userOne = {
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
  password: bcrypt.hashSync(initialPassword, 8),
  _id: ObjectID(initialId),
  usersLiked: [],
  usersBlocked: [],
  emailVerified: true,
};

const userTwo = {
  username: faker.internet.userName(),
  birthDate: faker.date.past(),
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
};

const newUser = {
  username: faker.internet.userName(),
  birthDate: faker.date.past(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  gender: faker.random.arrayElement(genders),
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
  userOneToken,
};
