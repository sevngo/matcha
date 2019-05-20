const { replace } = require('ramda');
const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');
const { Users } = require('../database');
const { JWT_SECRET } = require('../utils/constants');

exports.generateAuthToken = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await Users().findOne({ username });
    if (!user) throw new Error();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error();

    const token = await jwt.sign({ _id: user._id }, JWT_SECRET);

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(400).send();
    console.log(e); // eslint-disable-line no-console
  }
};

exports.auth = async (req, res, next) => {
  try {
    const token = replace('Bearer ', '')(req.header('Authorization'));
    const { _id } = jwt.verify(token, JWT_SECRET);
    const user = await Users().findOne({ _id: ObjectID(_id) });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send();
    console.log(e); // eslint-disable-line no-console
  }
};

exports.emailVerified = async (req, res, next) => {
  if (!req.user.emailVerified) return res.status(400).send();
  next();
};
