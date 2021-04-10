import mongodb from 'mongodb';
import faker from 'faker';
import { times } from 'ramda';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import { connectDb, getUsers, disconnectDb } from '../src/server/database.js';

const insertData = async () => {
  const genders = ['female', 'male'];
  const birthDateMin = moment().subtract(80, 'years').format('YYYY-MM-DD');
  const birthDateMax = moment().subtract(18, 'years').format('YYYY-MM-DD');
  const makeRandomUser = () => ({
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
    password: bcrypt.hashSync(faker.internet.password(), 8),
    _id: mongodb.ObjectID(),
    emailVerified: true,
  });
  const newUsers = times(makeRandomUser, 20);
  await getUsers().insertMany(newUsers);
  console.log('Data inserted in the database');
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
