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

const authUserPassword = faker.internet.password();
const authUserId = faker.random.alphaNumeric(12);
const authUserToken = createToken({ _id: authUserId });

const authUser = {
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
  password: bcrypt.hashSync(authUserPassword, 8),
  _id: ObjectID(authUserId),
  emailVerified: true,
  usersBlocked: [ObjectID()],
  usersLiked: [ObjectID()],
};

const unverifiedUserPassword = faker.internet.password();

const unverifiedUser = {
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
  password: bcrypt.hashSync(unverifiedUserPassword, 8),
  _id: ObjectID(),
};

const randomUser = () => ({
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
  emailVerified: true,
});

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
  authUser,
  randomUser,
  authUserPassword,
  newUser,
  authUserId,
  authUserToken,
  unverifiedUserPassword,
  unverifiedUser,
};
