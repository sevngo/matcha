const { replace } = require('ramda');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');
const { Users } = require('../database');
const { asyncHandler, ErrorResponse, createToken, verifyToken } = require('../utils/functions');

exports.generateAuthToken = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const myUser = await Users().findOne({ username });
  if (!myUser) return next(new ErrorResponse(400, 'Identification failed'));

  const isMatch = await bcrypt.compare(password, myUser.password);
  if (!isMatch) return next(new ErrorResponse(400, 'Identification failed'));

  const token = createToken({ _id: myUser._id });

  req.myUser = myUser;
  req.token = token;
  next();
});

exports.authenticate = asyncHandler(async (req, res, next) => {
  const token = replace('Bearer ', '')(req.header('Authorization'));
  const { _id } = verifyToken(token);
  const myUser = await Users().findOne({ _id: ObjectID(_id) });
  if (!myUser) return next(new ErrorResponse(401, 'Unauthorized'));
  req.myUser = myUser;
  next();
});

exports.isValidObjectId = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) return res.status(400).send();
  next();
};

exports.emailVerified = (req, res, next) => {
  if (!req.myUser.emailVerified) return res.status(400).send();
  next();
};
