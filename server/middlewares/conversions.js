const { ObjectID } = require('mongodb');
const { omit, reduce, trim, keys, is, map } = require('ramda');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { asyncHandler, ErrorResponse } = require('../utils/functions');

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
      return cb(new ErrorResponse(400, 'Please upload an image'));
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
    body: { usersLiked },
  } = req;
  if (usersLiked) req.body.usersLiked = map(id => ObjectID(id))(usersLiked);
  next();
};

exports.newUsersBlockedId = (req, res, next) => {
  const {
    body: { usersBlocked },
  } = req;
  if (usersBlocked) req.body.usersBlocked = map(id => ObjectID(id))(usersBlocked);
  next();
};
