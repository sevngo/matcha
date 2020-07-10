const { body, param, query } = require('express-validator');
const { map, is, all, split } = require('ramda');
const { ObjectID } = require('mongodb');
const { validate } = require('../middlewares/validation');

exports.bodyValidation = validate([
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
    .if(all(ObjectID.isValid))
    .customSanitizer(map(ObjectID)),
  body('usersBlocked')
    .optional()
    .isArray()
    .custom(all(ObjectID.isValid))
    .if(all(ObjectID.isValid))
    .customSanitizer(map(ObjectID)),
  body('socketId').optional().isString().trim(),
]);

exports.paramValidation = validate([
  param('id')
    .optional()
    .custom(ObjectID.isValid)
    .if(ObjectID.isValid)
    .customSanitizer(ObjectID),
  param('imageId')
    .optional()
    .custom(ObjectID.isValid)
    .if(ObjectID.isValid)
    .customSanitizer(ObjectID),
]);

exports.queryValidation = validate([
  query('maxDistance').optional().isString().toInt(),
  query('skip').optional().isString().toInt(),
  query('limit').optional().isString().toInt(),
  query('birthRange')
    .optional()
    .customSanitizer(split(':'))
    .customSanitizer(map((value) => new Date(value))),
]);
