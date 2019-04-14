const { toString, replace } = require('ramda');
const jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');
const { Users } = require('../database');

const generateAuthToken = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await Users().findOne({ username });
    if (!user) throw new Error();

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error();

    const token = await jwt.sign({ _id: toString(user._id) }, 'ofjqikfipqoejf');

    req.user = user;
    req.token = token;
    next();
  } catch {
    res.status(400).send();
  }
};

const auth = async (req, res, next) => {
  try {
    const token = replace('Bearer ', '')(req.header('Authorization'));
    const decoded = jwt.verify(token, 'ofjqikfipqoejf');
    const user = await Users().findOne({ _id: new ObjectID(decoded._id) });
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch {
    res.status(401).send();
  }
};

const isMyId = async (req, res, next) => {
  if (req.params.id !== toString(req.user._id)) return res.status(401).send();
  next();
};

module.exports = { generateAuthToken, auth, isMyId };