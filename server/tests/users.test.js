/* eslint-env node, jest */
const request = require('supertest');
const faker = require('faker');
const { omit } = require('ramda');
const app = require('../app');
const { connectDb, disconnectDb } = require('../database');
const { Users } = require('../database');
const { newUser, initialPassword, initialId, userOne, userTwo } = require('./data');

beforeAll(async () => {
  await connectDb();
});

beforeEach(async () => {
  await Users().deleteMany();
  await Users().insertMany([userOne, userTwo]);
});

afterAll(async () => {
  await disconnectDb();
});

test('POST /api/users', async () => {
  await request(app)
    .post('/api/users')
    .send(newUser)
    .expect(201);
});

test('POST /api/users/login', async () => {
  const myUser = omit(['birthDate', 'password', '_id', 'token'])(userOne);
  const { body: user } = await request(app)
    .post('/api/users/login')
    .send({ username: userOne.username, password: initialPassword })
    .expect(200);
  expect(user).toMatchObject(myUser);
});

test('GET /api/users', async () => {
  const userRegistered = omit(['birthDate', 'password', '_id', 'token', 'email'])(userTwo);
  const { body: users } = await request(app)
    .get('/api/users')
    .set('Authorization', `Bearer ${userOne.token}`)
    .expect(200);
  expect(users).toHaveLength(1);
  expect(users).toMatchObject([userRegistered]);
});

test('GET /api/users/:id', async () => {
  const userRegistered = omit(['birthDate', 'password', '_id', 'token', 'email'])(userOne);
  const { body: user } = await request(app)
    .get(`/api/users/${initialId}`)
    .set('Authorization', `Bearer ${userOne.token}`)
    .expect(200);
  expect(user).toMatchObject(userRegistered);
});

test('PATCH /api/users', async () => {
  const myUser = omit(['birthDate', 'password', '_id', 'token'])(userOne);
  const newValue = { username: faker.internet.userName() };
  const { body: user } = await request(app)
    .patch(`/api/users`)
    .send(newValue)
    .set('Authorization', `Bearer ${userOne.token}`)
    .expect(200);
  expect(user).toMatchObject({ ...myUser, ...newValue });
});

test('POST /api/users/forgot', async () => {
  await request(app)
    .post(`/api/users/forgot`)
    .send({ email: userOne.email })
    .expect(200);
});
