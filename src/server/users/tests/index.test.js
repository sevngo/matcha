/* eslint-env node, jest */
const request = require('supertest');
const faker = require('faker');
const path = require('path');
const { has } = require('ramda');
const app = require('../../app');
const { connectDb, disconnectDb, getUsers } = require('../../database');
const {
  newUser,
  initialPassword,
  initialId,
  userOne,
  userTwo,
  userOneToken,
} = require('./fixtures/db');

jest.mock('@sendgrid/mail', () => ({
  setApiKey: () => {},
  send: () => {},
}));

beforeAll(connectDb);

beforeEach(async () => {
  const Users = getUsers();
  await Users.deleteMany();
  await Users.insertMany([userOne, userTwo]);
});

afterAll(disconnectDb);

describe('/api/users', () => {
  describe('POST /api/users', () => {
    test('should create a new user', async () => {
      await request(app).post('/api/users').send(newUser).expect(201);
    });
    test('should not create a new user', async () => {
      await request(app).post('/api/users').send({}).expect(500);
    });
  });
  describe('POST /api/users/login', () => {
    test('should login user', async () => {
      const { body: user } = await request(app)
        .post('/api/users/login')
        .send({ username: userOne.username, password: initialPassword })
        .expect(200);
      expect(user.username).toEqual(userOne.username);
    });
    test('should not login user', async () => {
      await request(app)
        .post('/api/users/login')
        .send({ username: userOne.username, password: 'invalidPassword' })
        .expect(400);
    });
  });
  describe('GET /api/users', () => {
    test('should get all users', async () => {
      const { body: users } = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${userOneToken}`)
        .expect(200);
      expect(users.data).toHaveLength(1);
    });
  });
  describe('GET /api/users/:id', () => {
    test('should get specific user', async () => {
      const { body: user } = await request(app)
        .get(`/api/users/${initialId}`)
        .set('Authorization', `Bearer ${userOneToken}`)
        .expect(200);
      expect(user.username).toEqual(userOne.username);
    });
    test('should not found user', async () => {
      await request(app)
        .get(`/api/users/1asd5467qwe4`)
        .set('Authorization', `Bearer ${userOneToken}`)
        .expect(404);
    });
  });
  describe('PATCH /api/users', () => {
    test('should update user', async () => {
      const newValue = { username: faker.internet.userName() };
      const { body: user } = await request(app)
        .patch(`/api/users`)
        .send(newValue)
        .set('Authorization', `Bearer ${userOneToken}`)
        .expect(200);
      expect(user).toMatchObject(newValue);
    });
  });
  describe('POST /api/users/forgot', () => {
    test('should send email', async () => {
      await request(app)
        .post(`/api/users/forgot`)
        .send({ email: userOne.email })
        .expect(200);
    });
    test('should not send email', async () => {
      await request(app)
        .post(`/api/users/forgot`)
        .send({ email: 'invalid@email.com' })
        .expect(400);
    });
  });
  describe('POST /api/users/images', () => {
    test('should upload image', async () => {
      const { body: user } = await request(app)
        .post(`/api/users/images`)
        .set('Authorization', `Bearer ${userOneToken}`)
        .attach('image', path.resolve(__dirname, 'fixtures', 'profile-pic.jpg'))
        .expect(200);
      expect(has('images')(user)).toBeTruthy();
      const userData = await getUsers().findOne({ _id: userOne._id });
      expect(userData.images[0].data.buffer).toEqual(expect.any(Buffer));
    });
  });
});
