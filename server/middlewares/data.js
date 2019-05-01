const { ObjectID } = require('mongodb');
const { omit, reduce, trim, keys, is, map } = require('ramda');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const isValidObjectId = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) return res.status(400).send();
  next();
};

const newObjectId = (req, res, next) => {
  req._id = new ObjectID(req.params.id);
  next();
};

const newDateBirth = async (req, res, next) => {
  const { birthDate } = req.body;
  if (!birthDate) return next();
  req.body.birthDate = new Date(birthDate);
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

const uploadImage = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/))
      return cb(new Error('Please upload an image'));
    cb(undefined, true);
  },
});

const trimBody = (req, res, next) => {
  const { body } = req;
  const BodyTrimmed = reduce(
    (acc, key) => ({ ...acc, [key]: is(String, body[key]) ? trim(body[key]) : body[key] }),
    {},
  )(keys(body));
  req.body = BodyTrimmed;
  next();
};

const newUsersBlockedId = (req, res, next) => {
  const {
    body: { usersBlocked },
  } = req;
  req.body.usersBlocked = map(id => new ObjectID(id))(usersBlocked);
  next();
};

module.exports = {
  isValidObjectId,
  hashPassword,
  newObjectId,
  hashNewPassword,
  newDateBirth,
  uploadImage,
  trimBody,
  newUsersBlockedId,
};
