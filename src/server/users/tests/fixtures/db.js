import faker from 'faker';
import bcrypt from 'bcryptjs';
import mongodb from 'mongodb';
import { createToken } from '../../../utils/functions';

const { ObjectID } = mongodb;

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

export const authUserPassword = faker.internet.password();
const authUserId = ObjectID();
export const authUserIdString = authUserId.toString();
export const authUserToken = createToken({ _id: authUserIdString });

export const authUser = {
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
  _id: authUserId,
  emailVerified: true,
  usersBlocked: [ObjectID()],
  usersLiked: [ObjectID()],
};

export const unverifiedUserPassword = faker.internet.password();

export const unverifiedUser = {
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

export const randomUser = () => ({
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

export const newUser = {
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
