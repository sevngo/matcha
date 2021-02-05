import { reduce } from 'ramda';
import jwt from 'jsonwebtoken';
import mongodb from 'mongodb';
import { JWT_SECRET } from './env.js';

export const getIds = reduce((acc, object) => [...acc, object._id], []);

export const getSocketIds = reduce(
  (acc, object) => [...acc, object.socketId],
  []
);

export const createNotification = (user) => ({
  user,
  createdAt: new Date(),
  _id: mongodb.ObjectID(),
});

export const createToken = (value) =>
  jwt.sign(value, JWT_SECRET, { expiresIn: '1d' });

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);
