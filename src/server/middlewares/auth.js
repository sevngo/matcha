const { replace } = require('ramda');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');
const { getUsers } = require('../database');
const { createToken, verifyToken } = require('../utils/functions');
const {
  asyncHandler,
  ErrorResponse,
  IDENTIFICATION_FAILED,
  UNAUTHORIZED,
  UNVERIFIED_EMAIL,
} = require('../utils/error');

exports.generateAuthToken = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const auth = await getUsers().findOne({ username });
  if (!auth) return next(new ErrorResponse(400, IDENTIFICATION_FAILED));

  const isMatch = await bcrypt.compare(password, auth.password);
  if (!isMatch) return next(new ErrorResponse(400, IDENTIFICATION_FAILED));

  const token = createToken({ _id: auth._id });

  req.auth = auth;
  req.token = token;
  next();
});

exports.authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) next(new ErrorResponse(401, UNAUTHORIZED));
  const token = replace('Bearer ', '')(authHeader);
  let data;
  try {
    data = verifyToken(token);
  } catch (err) {
    return next(new ErrorResponse(401, UNAUTHORIZED));
  }
  const { _id } = data;
  const auth = await getUsers().findOne({ _id: ObjectID(_id) });
  if (!auth) return next(new ErrorResponse(401, UNAUTHORIZED));
  req.auth = auth;
  next();
});

exports.emailVerified = (req, res, next) => {
  if (!req.auth.emailVerified)
    return next(new ErrorResponse(400, UNVERIFIED_EMAIL));
  next();
};
