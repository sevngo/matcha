const { ObjectID } = require('mongodb');
const { toString, replace, pick, split, omit } = require('ramda');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users } = require('../database');

const isValidObjectId = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) return res.status(400).send();
  next();
};

const createObjectId = (req, res, next) => {
  req.id = new ObjectID(req.params.id);
  next();
};

const hashPassword = async (req, res, next) => {
  const { password } = req.body;
  if (!password) return next();
  req.body.password = await bcrypt.hash(password, 8);
  next();
};

const hashNewPassword = async (req, res, next) => {
  const { body } = req;
  const { newPassword } = body;
  if (!newPassword) {
    req.body = omit(['newPassword'])(body);
    return next();
  }
  const password = await bcrypt.hash(newPassword, 8);
  req.body = { ...omit(['newPassword'])(body), password };
  next();
};

const generateAuthToken = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const myAccount = await Users().findOne({ username });
    if (!myAccount) throw new Error();

    const isMatch = await bcrypt.compare(password, myAccount.password);
    if (!isMatch) throw new Error();

    const token = await jwt.sign({ _id: toString(myAccount._id) }, 'ofjqikfipqoejf');

    req.myAccount = myAccount;
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

const query = (req, res, next) => {
  const { query } = req;
  req.filter = pick(['gender'])(query);

  const { limit, skip, sortBy } = query;
  req.limit = parseInt(limit);
  req.skip = parseInt(skip);

  if (sortBy) {
    const [key, value] = split(':')(sortBy);
    req.sort = { [key]: value === 'desc' ? -1 : 1 };
  }
  next();
};

module.exports = {
  isValidObjectId,
  hashPassword,
  hashNewPassword,
  generateAuthToken,
  auth,
  isMyId,
  query,
  createObjectId,
};
