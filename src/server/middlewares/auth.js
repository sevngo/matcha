const { replace } = require('ramda');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');
const { Users } = require('../database');
const { asyncHandler, ErrorResponse, createToken, verifyToken } = require('../utils/functions');

exports.generateAuthToken = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const auth = await Users().findOne({ username });
  if (!auth) next(new ErrorResponse(400, 'Identification failed'));

  const isMatch = await bcrypt.compare(password, auth.password);
  if (!isMatch) next(new ErrorResponse(400, 'Identification failed'));

  const token = createToken({ _id: auth._id });

  req.auth = auth;
  req.token = token;
  next();
});

exports.authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) next(new ErrorResponse(401, 'Unauthorized'));
  const token = replace('Bearer ', '')(authHeader);
  const { _id } = verifyToken(token);
  const auth = await Users().findOne({ _id: ObjectID(_id) });
  if (!auth) next(new ErrorResponse(401, 'Unauthorized'));
  req.auth = auth;
  next();
});

exports.emailVerified = (req, res, next) => {
  if (!req.auth.emailVerified) next(new ErrorResponse(400, 'Unverified email'));
  next();
};
