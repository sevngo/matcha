const { body, param, query } = require('express-validator');
const { map, is, all, split, isEmpty } = require('ramda');
const bcrypt = require('bcryptjs');
const { ObjectID } = require('mongodb');
const { validate, sanatize } = require('../middlewares/validation');

exports.bodyValidation = validate('body', [
  body('username').optional().isString().isLength({ min: 3, max: 40 }),
  body('birthDate').optional().isString(),
  body('email').optional().isString().isEmail().isLength({ min: 3, max: 40 }),
  body('emailVerified').optional().isBoolean(),
  body('password').optional().isString().isLength({ min: 3, max: 40 }),
  body('gender').optional().isString(),
  body('address.name').optional().isString(),
  body('address.type').optional().isString(),
  body('address.coordinates')
    .optional()
    .isArray()
    .custom((value) => value.length === 2)
    .custom(all(is(Number))),
  body('usersLiked').optional().isArray().custom(all(ObjectID.isValid)),
  body('usersBlocked').optional().isArray().custom(all(ObjectID.isValid)),
  body('socketId').optional().isString(),
]);

exports.bodySanatization = sanatize([
  body('username').optional().trim(),
  body('birthDate').optional().trim().toDate(),
  body('email').optional().trim(),
  body('password')
    .optional()
    .customSanitizer((value) => bcrypt.hashSync(value, 8)),
  body('address.name').optional().trim(),
  body('address.type').optional().trim(),
  body('usersLiked').optional().customSanitizer(map(ObjectID)),
  body('usersBlocked').optional().customSanitizer(map(ObjectID)),
  body('socketId').optional().trim(),
]);

exports.paramValidation = validate('param', [
  param('id')
    .optional()
    .custom(ObjectID.isValid)
    .bail()
    .customSanitizer(ObjectID),
  param('imageId')
    .optional()
    .custom(ObjectID.isValid)
    .bail()
    .customSanitizer(ObjectID),
]);

exports.queryValidation = validate('query', [
  query('maxDistance').optional().isString().toInt(),
  query('skip').optional().isString().toInt(),
  query('limit').optional().isString().toInt(),
  query('birthRange')
    .optional()
    .customSanitizer(split(':'))
    .custom((value) => value.length === 2)
    .custom(all((value) => !isEmpty(value)))
    .bail()
    .customSanitizer(map((value) => new Date(value))),
]);
