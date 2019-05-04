const faker = require('faker');
const { omit } = require('ramda');
const bcrypt = require('bcryptjs');
const { ObjectID } = require('mongodb');

const initalPassword = faker.internet.password();

const initialUser = {
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
  password: bcrypt.hashSync(initalPassword, 8),
  _id: ObjectID(faker.random.alphaNumeric(12)),
  usersBlocked: [],
  emailVerified: true,
};

const loggedUser = omit(['birthDate', 'password', '_id'])(initialUser);

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
  initialUser,
  initalPassword,
  newUser,
  loggedUser,
};
