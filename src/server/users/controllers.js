import { split } from 'ramda';
import sharp from 'sharp';
import { match, matchIn } from '../utils/stages.js';
import {
  userProjection,
  authProjection,
  imageProjection,
} from './projections.js';
import { getUsers } from '../database.js';
import sendEmail from '../emails.js';
import { asyncHandler } from '../middlewares/error.js';
import { createToken, ErrorResponse } from '../utils/functions.js';
import {
  USER_NOT_FOUND,
  EMAIL_NOT_FOUND,
  IMAGE_NOT_FOUND,
} from '../utils/enums.js';

export const postUserController = asyncHandler(async (req, res) => {
  const Users = getUsers();
  const {
    ops: [user],
  } = await Users.insertOne(req.body);
  const { _id, email, username } = user;
  const token = createToken({ _id });
  const url = `${req.headers.origin}/verify/${token}`;
  await sendEmail(
    email,
    'Email confirmation',
    `Welcome to Matcha, ${username}. Click on this link to confirm your email : ${url}`
  );
  res.status(201).send();
});

export const getUsersController = asyncHandler(async (req, res) => {
  const {
    query: { gender, birthRange, limit, skip, sortBy, maxDistance },
    auth: {
      _id,
      usersBlocked,
      address: { coordinates },
    },
  } = req;
  const Users = getUsers();
  let cursor = Users.aggregate();
  if (coordinates && maxDistance)
    cursor.geoNear({
      near: { type: 'Point', coordinates },
      distanceField: 'distance',
      distanceMultiplier: 0.001,
      maxDistance,
      spherical: true,
    });
  cursor.match({ emailVerified: { $eq: true } });
  if (gender) cursor.match({ gender });
  if (usersBlocked) cursor.match({ _id: { $nin: usersBlocked } });
  if (_id) cursor.match({ _id: { $ne: _id } });
  if (birthRange)
    cursor.match({ birthDate: { $gt: birthRange[0], $lt: birthRange[1] } });
  if (sortBy) {
    const [sortKey, sortValue] = split(':')(sortBy);
    cursor.sort({ [sortKey]: sortValue === 'desc' ? -1 : 1 });
  }
  cursor.project(userProjection);
  const totalUsers = await cursor.toArray();
  const total = totalUsers.length;
  if (skip) cursor.skip(skip);
  if (limit) cursor.limit(limit);
  const data = await cursor.toArray();
  res.status(200).send({ data, total });
});

export const getUserController = asyncHandler(async (req, res, next) => {
  const Users = getUsers();
  const [data] = await Users.aggregate()
    .match({ _id: req.params.id })
    .project(userProjection)
    .toArray();
  if (!data) return next(new ErrorResponse(404, USER_NOT_FOUND));
  res.send(data);
});

export const patchUserController = asyncHandler(async (req, res, next) => {
  const {
    auth: { _id },
    body,
  } = req;
  const Users = getUsers();
  const { value: user } = await Users.findOneAndUpdate(
    { _id },
    { $set: body },
    { returnOriginal: false }
  );
  const { usersLiked, usersBlocked } = user;
  const cursor = Users.aggregate().match({ _id });
  if (usersLiked)
    cursor.lookup({
      from: 'users',
      localField: 'usersLiked',
      foreignField: '_id',
      as: 'usersLiked',
    });
  if (usersBlocked)
    cursor.lookup({
      from: 'users',
      localField: 'usersBlocked',
      foreignField: '_id',
      as: 'usersBlocked',
    });
  if (usersLiked)
    cursor.lookup({
      from: 'users',
      pipeline: [matchIn('_id', usersLiked), match('usersLiked', _id)],
      as: 'friends',
    });
  cursor.project(authProjection);
  const [data] = await cursor.toArray();
  res.send(data);
});

export const postUserLoginController = asyncHandler(async (req, res) => {
  const {
    auth: { _id, usersLiked, usersBlocked },
    token,
  } = req;
  const Users = getUsers();
  const cursor = Users.aggregate().match({ _id });
  if (usersLiked)
    cursor.lookup({
      from: 'users',
      localField: 'usersLiked',
      foreignField: '_id',
      as: 'usersLiked',
    });
  if (usersBlocked)
    cursor.lookup({
      from: 'users',
      localField: 'usersBlocked',
      foreignField: '_id',
      as: 'usersBlocked',
    });
  if (usersLiked)
    cursor.lookup({
      from: 'users',
      pipeline: [matchIn('_id', usersLiked), match('usersLiked', _id)],
      as: 'friends',
    });
  cursor.project(authProjection);
  const [data] = await cursor.toArray();
  res.send({ ...data, token });
});

export const postUserForgotController = asyncHandler(async (req, res, next) => {
  const Users = getUsers();
  const user = await Users.findOne({ email: req.body.email });
  if (!user) return next(new ErrorResponse(404, EMAIL_NOT_FOUND));
  const { _id, email, username } = user;
  const token = createToken({ _id });
  const url = `${req.headers.origin}/reset/${token}`;
  await sendEmail(
    email,
    'Password reset',
    `Hello ${username}. Click on this link to reset your password : ${url}`
  );
  res.status(200).send();
});

export const postUserImageController = asyncHandler(async (req, res, next) => {
  const {
    auth: { _id },
  } = req;
  const Users = getUsers();
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 500, fit: 'outside' })
    .png()
    .toBuffer();
  await Users.findOneAndUpdate({ _id }, { $set: { image: buffer } });
  const [data] = await Users.aggregate()
    .match({ _id })
    .project(imageProjection)
    .toArray();
  res.send(data);
});

export const getUserImageController = asyncHandler(async (req, res, next) => {
  const Users = getUsers();
  const { id } = req.params;
  const user = await Users.findOne({ _id: id });
  if (!user) return next(new ErrorResponse(404, USER_NOT_FOUND));
  const buffer = user.image?.buffer;
  if (!buffer) return next(new ErrorResponse(404, IMAGE_NOT_FOUND));
  res.type('png');
  res.send(buffer);
});
