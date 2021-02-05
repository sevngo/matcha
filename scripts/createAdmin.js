import mongodb from 'mongodb';
import faker from 'faker';
import bcrypt from 'bcryptjs';
import { connectDb, getUsers, disconnectDb } from '../src/server/database.js';

const insertData = async () => {
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

  const newUser = {
    username: 'admin',
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
    password: bcrypt.hashSync('admin', 8),
    _id: mongodb.ObjectID(),
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
