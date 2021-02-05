/* eslint-env node, jest */
import request from 'supertest';
import faker from 'faker';
import path from 'path';
import { has } from 'ramda';
import app from '../../app';
import { connectDb, disconnectDb, getUsers } from '../../database';
import {
  newUser,
  authUserPassword,
  authUserId,
  authUser,
  randomUser,
  authUserToken,
  unverifiedUserPassword,
  unverifiedUser,
} from './fixtures/db';
import {
  IMAGE_NOT_FOUND,
  EMAIL_NOT_FOUND,
  IDENTIFICATION_FAILED,
  USER_NOT_FOUND,
  UNVERIFIED_EMAIL,
  UNAUTHORIZED,
  INVALID_IMAGE_FORMAT,
} from '../../utils/error';
import { createToken } from '../../utils/functions';
import mongodb from 'mongodb';

jest.mock('@sendgrid/mail', () => ({
  setApiKey: () => {},
  send: () => {},
}));

beforeAll(connectDb);

beforeEach(async () => {
  const Users = getUsers();
  await Users.deleteMany();
  await Users.insertMany([
    authUser,
    unverifiedUser,
    randomUser(),
    randomUser(),
  ]);
});

afterAll(disconnectDb);

describe('/api/users', () => {
  describe('POST /api/users', () => {
    test('should create a new user', async () => {
      await request(app).post('/api/users').send(newUser).expect(201);
    });
    test('should 500 failed validation', async () => {
      await request(app).post('/api/users').send({}).expect(500);
    });
  });
  describe('POST /api/users/login', () => {
    test('should login user', async () => {
      const { body } = await request(app)
        .post('/api/users/login')
        .send({ username: authUser.username, password: authUserPassword })
        .expect(200);
      expect(body.username).toEqual(authUser.username);
    });
    test('should 400 invalid password', async () => {
      const { body } = await request(app)
        .post('/api/users/login')
        .send({ username: authUser.username, password: 'invalidPassword' })
        .expect(400);
      expect(body.message).toEqual(IDENTIFICATION_FAILED);
    });
    test('should 400 invalid username', async () => {
      const { body } = await request(app)
        .post('/api/users/login')
        .send({ username: 'invalidUsername', password: authUserPassword })
        .expect(400);
      expect(body.message).toEqual(IDENTIFICATION_FAILED);
    });
    test('should 400 unverified email', async () => {
      const { body } = await request(app)
        .post('/api/users/login')
        .send({
          username: unverifiedUser.username,
          password: unverifiedUserPassword,
        })
        .expect(400);
      expect(body.message).toEqual(UNVERIFIED_EMAIL);
    });
  });
  describe('GET /api/users', () => {
    test('should get all users', async () => {
      const { body } = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authUserToken}`)
        .expect(200);
      expect(body.data).toHaveLength(2);
    });
    test('should get all users with a full query', async () => {
      const { body } = await request(app)
        .get(
          '/api/users?gender=male&birthRange=1900-7-18:2030-7-18&sortBy=distance:asc&limit=10&skip=1&maxDistance=20000000'
        )
        .set('Authorization', `Bearer ${authUserToken}`)
        .expect(200);
      expect(body.data).toHaveLength(1);
    });
    test('should 401 missing authorization header', async () => {
      const { body } = await request(app).get('/api/users').expect(401);
      expect(body.message).toEqual(UNAUTHORIZED);
    });
    test('should 401 wrong token', async () => {
      const { body } = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer fakeToken`)
        .expect(401);
      expect(body.message).toEqual(UNAUTHORIZED);
    });
    test('should 401 token no user', async () => {
      const randomToken = createToken({ _id: mongodb.ObjectID() });
      const { body } = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${randomToken}`)
        .expect(401);
      expect(body.message).toEqual(UNAUTHORIZED);
    });
  });

  describe('GET /api/users/:id', () => {
    test('should get specific user', async () => {
      const { body } = await request(app)
        .get(`/api/users/${authUserId}`)
        .set('Authorization', `Bearer ${authUserToken}`)
        .expect(200);
      expect(body.username).toEqual(authUser.username);
    });
    test('should 404 user not found', async () => {
      const { body } = await request(app)
        .get(`/api/users/fakeId`)
        .set('Authorization', `Bearer ${authUserToken}`)
        .expect(404);
      expect(body.message).toEqual(USER_NOT_FOUND);
    });
  });
  describe('PATCH /api/users', () => {
    test('should update user', async () => {
      const newValue = { username: faker.internet.userName() };
      const { body } = await request(app)
        .patch(`/api/users`)
        .send(newValue)
        .set('Authorization', `Bearer ${authUserToken}`)
        .expect(200);
      expect(body).toMatchObject(newValue);
    });
  });
  describe('POST /api/users/forgot', () => {
    test('should send email', async () => {
      await request(app)
        .post(`/api/users/forgot`)
        .send({ email: authUser.email })
        .expect(200);
    });
    test('should 404 email not found', async () => {
      const { body } = await request(app)
        .post(`/api/users/forgot`)
        .send({ email: 'invalid@email.com' })
        .expect(404);
      expect(body.message).toEqual(EMAIL_NOT_FOUND);
    });
  });
  describe('POST /api/users/image', () => {
    test('should upload image', async () => {
      const { body } = await request(app)
        .post(`/api/users/image`)
        .set('Authorization', `Bearer ${authUserToken}`)
        .attach('image', path.resolve(__dirname, 'fixtures', 'favicon.png'))
        .expect(200);
      expect(has('image')(body)).toBeTruthy();
      const userData = await getUsers().findOne({ _id: authUser._id });
      expect(userData.image.buffer).toEqual(expect.any(Buffer));
    });
    test('should 400 invalid image format', async () => {
      const { body } = await request(app)
        .post(`/api/users/image`)
        .set('Authorization', `Bearer ${authUserToken}`)
        .attach('image', path.resolve(__dirname, 'fixtures', 'favicon.ico'))
        .expect(400);
      expect(body.message).toEqual(INVALID_IMAGE_FORMAT);
    });
  });
  describe('GET /api/users/:id/image', () => {
    test('should 404 image not found', async () => {
      const { body } = await request(app)
        .get(`/api/users/${authUserId}/image`)
        .expect(404);
      expect(body.message).toEqual(IMAGE_NOT_FOUND);
    });
    test('should 404 user not found', async () => {
      const { body } = await request(app)
        .get(`/api/users/fakeId/image`)
        .expect(404);
      expect(body.message).toEqual(USER_NOT_FOUND);
    });
    test('should upload and get image', async () => {
      await request(app)
        .post(`/api/users/image`)
        .set('Authorization', `Bearer ${authUserToken}`)
        .attach('image', path.resolve(__dirname, 'fixtures', 'favicon.png'))
        .expect(200);
      const { body } = await request(app)
        .get(`/api/users/${authUserId}/image`)
        .expect(200);
      expect(body).toEqual(expect.any(Buffer));
    });
  });
});
