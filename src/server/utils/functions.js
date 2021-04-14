import jwt from 'jsonwebtoken';
import mongodb from 'mongodb';

export const ErrorResponse = class ErrorResponse extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
};

export const createNotification = (user) => ({
  user,
  createdAt: new Date(),
  _id: mongodb.ObjectID(),
});

export const createToken = (value) =>
  jwt.sign(value, process.env.JWT_SECRET, { expiresIn: '1d' });

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
