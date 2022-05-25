import faker from 'faker';
import bcrypt from 'bcryptjs';
import mongodb from 'mongodb';
import moment from 'moment';
import { createToken } from '../../../../utils/helpers';

const { ObjectID } = mongodb;

const birthDateMin = moment().subtract(80, 'years').format('YYYY-MM-DD');
const birthDateMax = moment().subtract(18, 'years').format('YYYY-MM-DD');

export const authUserPassword = 'password';
const authUserId = ObjectID();
export const authUserIdString = authUserId.toString();
export const authUserToken = createToken({ _id: authUserIdString });

export const authUser = {
  username: 'authUser',
  birthDate: faker.date.between(birthDateMin, birthDateMax),
  email: 'authUser@email.com',
  gender: 'female',
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
  usersLiked: [ObjectID()],
};

export const unverifiedUserPassword = 'password';

export const unverifiedUser = {
  username: 'unverifiedUser',
  birthDate: faker.date.between(birthDateMin, birthDateMax),
  email: 'unverifiedUser@email.com',
  gender: 'male',
  address: {
    type: 'Point',
    name: '1 street road',
    coordinates: [
      parseFloat(faker.address.longitude()),
      parseFloat(faker.address.latitude()),
    ],
  },
  password: bcrypt.hashSync(unverifiedUserPassword, 8),
  _id: ObjectID(),
};

export const randomUser1 = {
  username: 'randomUser1',
  birthDate: faker.date.between(birthDateMin, birthDateMax),
  email: 'randomUser1@email.com',
  gender: 'male',
  address: {
    type: 'Point',
    name: '1 street road',
    coordinates: [
      parseFloat(faker.address.longitude()),
      parseFloat(faker.address.latitude()),
    ],
  },
  password: 'password',
  _id: ObjectID(),
  emailVerified: true,
};

export const randomUser2 = {
  username: 'randomUser2',
  birthDate: faker.date.between(birthDateMin, birthDateMax),
  email: 'randomUser2@email.com',
  gender: 'male',
  address: {
    type: 'Point',
    name: '1 street road',
    coordinates: [
      parseFloat(faker.address.longitude()),
      parseFloat(faker.address.latitude()),
    ],
  },
  password: 'password',
  _id: ObjectID(),
  emailVerified: true,
};

export const newUser = {
  username: 'newUser',
  birthDate: faker.date.past(),
  email: 'newUser@email.com',
  gender: 'female',
  address: {
    type: 'Point',
    name: '1 street road',
    coordinates: [
      parseFloat(faker.address.longitude()),
      parseFloat(faker.address.latitude()),
    ],
  },
  password: 'password',
};
