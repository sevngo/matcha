const { replace } = require('ramda');
const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');
const { Users } = require('../database');
const { JWT_SECRET } = require('../utils/constants');
const { asyncHandler } = require('../utils/functions');

exports.generateAuthToken = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const myUser = await Users().findOne({ username });
  if (!myUser) return res.status(400).send();

  const isMatch = await bcrypt.compare(password, myUser.password);
  if (!isMatch) return res.status(400).send();

  const token = await jwt.sign({ _id: myUser._id }, JWT_SECRET);

  req.myUser = myUser;
  req.token = token;
  next();
});

exports.authenticate = asyncHandler(async (req, res, next) => {
  const token = replace('Bearer ', '')(req.header('Authorization'));
  const { _id } = jwt.verify(token, JWT_SECRET);
  const myUser = await Users().findOne({ _id: ObjectID(_id) });
  if (!myUser) return res.status(401).send();
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
