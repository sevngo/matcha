import { check } from 'express-validator';
import { map, all, split } from 'ramda';
import bcrypt from 'bcryptjs';
import mongodb from 'mongodb';
import multer from 'multer';
import { INVALID_IMAGE_FORMAT } from '../utils/enums.js';
import { ErrorResponse } from '../utils/helpers.js';

const { ObjectID } = mongodb;

const sanatize = {
  toDate: (field) => check(field).optional().toDate(),
  hash: (field) =>
    check(field)
      .isString()
      .bail()
      .customSanitizer((value) => bcrypt.hashSync(value, 8)),
  objectIds: (field) =>
    check(field)
      .custom(all(ObjectID.isValid))
      .bail()
      .customSanitizer(map(ObjectID)),
  objectId: (field) =>
    check(field).custom(ObjectID.isValid).bail().customSanitizer(ObjectID),
  toInt: (field) => check(field).optional().toInt(),
  dateRange: (field) =>
    check(field)
      .isString()
      .bail()
      .customSanitizer(split(':'))
      .customSanitizer(map((value) => new Date(value))),
  image: multer({
    limits: {
      fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/))
        return cb(new ErrorResponse(400, INVALID_IMAGE_FORMAT));
      cb(undefined, true);
    },
  }),
};

export default sanatize;
