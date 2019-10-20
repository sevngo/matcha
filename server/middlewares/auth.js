const { replace } = require('ramda');
const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');
const { Users } = require('../database');
const { JWT_SECRET } = require('../utils/constants');

exports.generateAuthToken = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const myUser = await Users().findOne({ username });
    if (!myUser) throw new Error();

    const isMatch = await bcrypt.compare(password, myUser.password);
    if (!isMatch) throw new Error();

    const token = await jwt.sign({ _id: myUser._id }, JWT_SECRET);

    req.myUser = myUser;
    req.token = token;
    next();
  } catch (e) {
    res.status(400).send();
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const token = replace('Bearer ', '')(req.header('Authorization'));
    const { _id } = jwt.verify(token, JWT_SECRET);
    const myUser = await Users().findOne({ _id: ObjectID(_id) });
    if (!myUser) throw new Error();
    req.myUser = myUser;
    next();
  } catch (e) {
    res.status(401).send();
  }
};

exports.isValidObjectId = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) return res.status(400).send();
  next();
};

exports.emailVerified = (req, res, next) => {
  if (!req.myUser.emailVerified) return res.status(400).send();
  next();
};
