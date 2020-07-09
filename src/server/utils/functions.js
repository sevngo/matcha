const { reduce } = require('ramda');
const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const { JWT_SECRET } = require('./env');

exports.asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

exports.ErrorResponse = class ErrorResponse extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
};

exports.getIds = reduce((acc, object) => [...acc, object._id], []);

exports.getSocketIds = reduce((acc, object) => [...acc, object.socketId], []);

exports.createNotification = (user) => ({
  user,
  createdAt: new Date(),
  _id: ObjectID(),
});

exports.createToken = (value) =>
  jwt.sign(value, JWT_SECRET, { expiresIn: '1d' });

exports.verifyToken = (token) => jwt.verify(token, JWT_SECRET);
