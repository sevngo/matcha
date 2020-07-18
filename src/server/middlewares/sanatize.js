const { check } = require('express-validator');
const { map, all, split } = require('ramda');
const bcrypt = require('bcryptjs');
const { ObjectID } = require('mongodb');
const multer = require('multer');
const { ErrorResponse, INVALID_IMAGE_FORMAT } = require('../utils/error');

exports.toDate = (field) => check(field).optional().toDate();

exports.hash = (field) =>
  check(field)
    .isString()
    .bail()
    .customSanitizer((value) => bcrypt.hashSync(value, 8));

exports.objectIds = (field) =>
  check(field)
    .custom(all(ObjectID.isValid))
    .bail()
    .customSanitizer(map(ObjectID));

exports.objectId = (field) =>
  check(field).custom(ObjectID.isValid).bail().customSanitizer(ObjectID);

exports.toInt = (field) => check(field).optional().toInt();

exports.dateRange = (field) =>
  check(field)
    .isString()
    .bail()
    .customSanitizer(split(':'))
    .customSanitizer(map((value) => new Date(value)));

exports.image = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/))
      return cb(new ErrorResponse(400, INVALID_IMAGE_FORMAT));
    cb(undefined, true);
  },
});
