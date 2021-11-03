import jwt from 'jsonwebtoken';

export const ErrorResponse = class ErrorResponse extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
};

export const createToken = (value) =>
  jwt.sign(value, process.env.JWT_SECRET, { expiresIn: '1d' });

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
