const { body, param, query } = require('express-validator');
const { map, is, all, split, isEmpty } = require('ramda');
const { ObjectID } = require('mongodb');
const { validate } = require('../middlewares/validation');

exports.bodyValidation = validate('body', [
  body('username').optional().isString().trim().isLength({ min: 3, max: 40 }),
  body('birthDate').optional().isString().trim().toDate(),
  body('email')
    .optional()
    .isString()
    .trim()
    .normalizeEmail()
    .isLength({ min: 3, max: 40 }),
  body('emailVerified').optional().isBoolean(),
  body('password').optional().isString().trim().isLength({ min: 3, max: 40 }),
  body('newPassword')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3, max: 40 }),
  body('gender').optional().isString().trim(),
  body('address.name').optional().isString().trim(),
  body('address.type').optional().isString().trim(),
  body('address.coordinates')
    .optional()
    .isArray()
    .custom((value) => value.length === 2)
    .custom(all(is(Number))),
  body('usersLiked')
    .optional()
    .isArray()
    .custom(all(ObjectID.isValid))
    .bail()
    .customSanitizer(map(ObjectID)),
  body('usersBlocked')
    .optional()
    .isArray()
    .custom(all(ObjectID.isValid))
    .bail()
    .customSanitizer(map(ObjectID)),
  body('socketId').optional().isString().trim(),
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
