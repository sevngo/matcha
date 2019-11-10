const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');
const { map, omit } = require('ramda');
const { body, check } = require('express-validator');
const multer = require('multer');
const { asyncHandler, ErrorResponse } = require('../utils/functions');

exports.objectId = field =>
  check(field)
    .optional()
    .customSanitizer(value => ObjectID(value));

exports.objectIds = field =>
  check(field)
    .optional()
    .customSanitizer(value => map(id => ObjectID(id))(value));

exports.newDate = field =>
  check(field)
    .optional()
    .trim()
    .toDate();

exports.hash = field =>
  body(field)
    .optional()
    .trim()
    .customSanitizer(value => bcrypt.hashSync(value, 8));

exports.newPassword = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const { newPassword } = body;
  if (!newPassword) return next();
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
