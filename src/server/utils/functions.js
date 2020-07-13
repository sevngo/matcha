const { reduce } = require('ramda');
const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const { JWT_SECRET } = require('./env');

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
