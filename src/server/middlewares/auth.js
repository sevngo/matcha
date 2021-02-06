import { replace } from 'ramda';
import mongodb from 'mongodb';
import bcrypt from 'bcryptjs';
import { getUsers } from '../database.js';
import { createToken, verifyToken, ErrorResponse } from '../utils/functions.js';
import { asyncHandler } from './error.js';
import {
  IDENTIFICATION_FAILED,
  UNAUTHORIZED,
  UNVERIFIED_EMAIL,
} from '../utils/enums.js';

const auth = {
  generateAuthToken: asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;
    const auth = await getUsers().findOne({ username });
    if (!auth) return next(new ErrorResponse(400, IDENTIFICATION_FAILED));

    const isMatch = await bcrypt.compare(password, auth.password);
    if (!isMatch) return next(new ErrorResponse(400, IDENTIFICATION_FAILED));

    const token = createToken({ _id: auth._id });

    req.auth = auth;
    req.token = token;
    next();
  }),
  authenticate: asyncHandler(async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) next(new ErrorResponse(401, UNAUTHORIZED));
    const token = replace('Bearer ', '')(authHeader);
    let data;
    try {
      data = verifyToken(token);
    } catch (err) {
      return next(new ErrorResponse(401, UNAUTHORIZED));
    }
    const { _id } = data;
    const auth = await getUsers().findOne({ _id: mongodb.ObjectID(_id) });
    if (!auth) return next(new ErrorResponse(401, UNAUTHORIZED));
    req.auth = auth;
    next();
  }),
  isMyUser: asyncHandler(async (req, res, next) => {
    const isMyUser = req.auth._id.toString() === req.params.id;
    if (!isMyUser) return next(new ErrorResponse(401, UNAUTHORIZED));
    next();
  }),
  emailVerified: (req, res, next) => {
    if (!req.auth.emailVerified)
      return next(new ErrorResponse(400, UNVERIFIED_EMAIL));
    next();
  },
};

export default auth;
