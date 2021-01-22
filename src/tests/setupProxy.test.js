const express = require('express');
const request = require('supertest');
const proxy = require('../setupProxy');
const nock = require('nock');

let app;

beforeAll(() => {
  app = express();
  proxy(app);
  nock(process.env.REACT_APP_API_URL).get('/api').reply(200, {});
});

describe('setupProxy', () => {
  test('should create a new user', async () => {
    await request(app).get('/api').expect(200);
  });
});
