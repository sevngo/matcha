const { ObjectID } = require('mongodb');
const faker = require('faker');
const bcrypt = require('bcryptjs');
const { connectDb, getUsers, disconnectDb } = require('../src/server/database');

const argv = require('yargs')
  .option('username', {
    alias: 'u',
    type: 'string',
    demandOption: true,
    description: 'Account username',
  })
  .option('password', {
    alias: 'p',
    type: 'string',
    demandOption: true,
    description: 'Account password',
  })
  .help().argv;

const insertData = async () => {
  const genders = ['female', 'male'];
  const today = new Date();
  const birthDateMin = new Date(today.getFullYear() - 50, today.getMonth(), today.getDate());
  const birthDateMax = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  const newUser = {
    username: argv.username,
    birthDate: faker.date.between(birthDateMin, birthDateMax),
    email: faker.internet.email(),
    gender: faker.random.arrayElement(genders),
    address: {
      type: 'Point',
      name: faker.address.streetAddress(),
      coordinates: [parseFloat(faker.address.longitude()), parseFloat(faker.address.latitude())],
    },
    password: bcrypt.hashSync(argv.password, 8),
    _id: ObjectID(),
    emailVerified: true,
  };
  await getUsers().insertOne(newUser);
  console.log('New verified user created');
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
