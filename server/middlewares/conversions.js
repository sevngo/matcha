const { ObjectID } = require('mongodb');
const { omit, reduce, trim, keys, is, map } = require('ramda');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { asyncHandler } = require('./utils');

exports.newObjectId = (req, res, next) => {
  req._id = ObjectID(req.params.id);
  next();
};

exports.newDateBirth = (req, res, next) => {
  const { birthDate } = req.body;
  if (!birthDate) return next();
  req.body.birthDate = new Date(birthDate);
  next();
};

exports.hashPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  if (!password) return next();
  req.body.password = await bcrypt.hash(password, 8);
  next();
});

exports.hashNewPassword = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const { newPassword } = body;
  if (!newPassword) {
    req.body = omit(['newPassword'])(body);
    return next();
  }
  const password = await bcrypt.hash(newPassword, 8);
  req.body = { ...omit(['newPassword'])(body), password };
  next();
});

exports.uploadImage = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/))
      return cb(new Error('Please upload an image'));
    cb(undefined, true);
  },
});

exports.trimBody = (req, res, next) => {
  const { body } = req;
  const BodyTrimmed = reduce(
    (acc, key) => ({ ...acc, [key]: is(String, body[key]) ? trim(body[key]) : body[key] }),
    {},
  )(keys(body));
  req.body = BodyTrimmed;
  next();
};

exports.newUsersLikedId = (req, res, next) => {
  const {
    body: { usersLikedIds },
  } = req;
  if (usersLikedIds) req.body.usersLikedIds = map(id => ObjectID(id))(usersLikedIds);
  next();
};

exports.newUsersBlockedId = (req, res, next) => {
  const {
    body: { usersBlockedIds },
  } = req;
  if (usersBlockedIds) req.body.usersBlockedIds = map(id => ObjectID(id))(usersBlockedIds);
  next();
};
