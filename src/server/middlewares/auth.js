const { replace } = require('ramda');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');
const { getUsers } = require('../database');
const {
  asyncHandler,
  ErrorResponse,
  createToken,
  verifyToken,
} = require('../utils/functions');

exports.generateAuthToken = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const auth = await getUsers().findOne({ username });
  if (!auth) return next(new ErrorResponse(400, 'identification failed'));

  const isMatch = await bcrypt.compare(password, auth.password);
  if (!isMatch) return next(new ErrorResponse(400, 'identification failed'));

  const token = createToken({ _id: auth._id });

  req.auth = auth;
  req.token = token;
  next();
});

exports.authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) next(new ErrorResponse(401, 'unauthorized'));
  const token = replace('Bearer ', '')(authHeader);
  let data;
  try {
    data = verifyToken(token);
  } catch (err) {
    return next(new ErrorResponse(401, 'unauthorized'));
  }
  const { _id } = data;
  const auth = await getUsers().findOne({ _id: ObjectID(_id) });
  if (!auth) return next(new ErrorResponse(401, 'unauthorized'));
  req.auth = auth;
  next();
});

exports.emailVerified = (req, res, next) => {
  if (!req.auth.emailVerified)
    return next(new ErrorResponse(400, 'unverified email'));
  next();
};
