/* eslint-env node, jest */
const request = require('supertest');
const app = require('../app');
const { connectDb, disconnectDb } = require('../database');
const { Users } = require('../database');
const { initialUser, newUser, initalPassword, loggedUser } = require('./data');

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

test('should register a new user', async () => {
  await request(app)
    .post('/api/users')
    .send(newUser)
    .expect(201);
});

test('should login user', async () => {
  const { body: user } = await request(app)
    .post('/api/users/login')
    .send({ username: initialUser.username, initalPassword })
    .expect(200);
  expect(user).toMatchObject(loggedUser);
});
