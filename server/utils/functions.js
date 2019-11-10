const { filter, isEmpty, reduce } = require('ramda');
const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const { NODE_ENV, DEVSERVER_PORT, JWT_SECRET } = require('./constants');

exports.asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

exports.ErrorResponse = class ErrorResponse extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
};

exports.getAppUrl = (protocol, hostname, host) => {
  const fullUrl =
    NODE_ENV === 'development'
      ? `${protocol}://${hostname}:${DEVSERVER_PORT}`
      : `${protocol}://${host}`;
  return fullUrl;
};

exports.compact = filter(value => value && !isEmpty(value));

exports.getIds = reduce((acc, object) => [...acc, object._id], []);

exports.createNotification = user => ({ user, createdAt: new Date(), _id: ObjectID() });

exports.createToken = value => jwt.sign(value, JWT_SECRET);

exports.verifyToken = token => jwt.verify(token, JWT_SECRET);
