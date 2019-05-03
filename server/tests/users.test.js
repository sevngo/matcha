/* eslint-env node, jest */
const request = require('supertest');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');
const faker = require('faker');
const app = require('../app');
const { connectDb, disconnectDb } = require('../database');
const { Users } = require('../database');

const password = faker.internet.password();
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
  password: bcrypt.hashSync(password, 8),
  _id: new ObjectID(faker.random.alphaNumeric(12)),
  usersBlocked: [],
  emailVerified: true,
};

beforeAll(async () => {
  await connectDb();
});

beforeEach(async () => {
  await Users().deleteMany();
  await Users().insertOne(initialUser);
});

afterAll(async () => {
  await disconnectDb();
});

test('should sign up a new user', async () => {
  await request(app)
    .post('/api/users')
    .send({
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
    })
    .expect(201);
});

test('should login user', async () => {
  await request(app)
    .post('/api/users/login')
    .send({ username: initialUser.username, password })
    .expect(200);
});
