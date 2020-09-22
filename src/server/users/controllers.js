const { ObjectID } = require('mongodb');
const { find, propEq, split } = require('ramda');
const sharp = require('sharp');
const { match, matchIn, addFieldBirthDate } = require('../utils/stages');
const {
  userProjection,
  authProjection,
  imageProjection,
} = require('./projections');
const { getUsers } = require('../database');
const { sendEmail } = require('../emails');
const { asyncHandler } = require('../middlewares/error');
const { createToken } = require('../utils/functions');
const {
  ErrorResponse,
  USER_NOT_FOUND,
  EMAIL_NOT_FOUND,
} = require('../utils/error');

exports.postUser = asyncHandler(async (req, res) => {
  const Users = getUsers();
  const {
    ops: [user],
  } = await Users.insertOne(req.body);
  const { _id, email, username } = user;
  const token = createToken({ _id });
  const url = `${req.headers.referer}verify/${token}`;
  await sendEmail(
    email,
    'Email confirmation',
    `Welcome to Matcha, ${username}. Click on this link to confirm your email : ${url}`
  );
  res.status(201).send();
});

exports.getUsers = asyncHandler(async (req, res) => {
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

exports.getUser = asyncHandler(async (req, res, next) => {
  const Users = getUsers();
  const [data] = await Users.aggregate([addFieldBirthDate])
    .match({ _id: req.params.id })
    .project(userProjection)
    .toArray();
  if (!data) return next(new ErrorResponse(404, USER_NOT_FOUND));
  res.send(data);
});

exports.patchUser = asyncHandler(async (req, res, next) => {
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
  if (!user) return next(new ErrorResponse(404, USER_NOT_FOUND));
  const { usersLiked, usersBlocked } = user;
  const cursor = Users.aggregate([addFieldBirthDate]).match({ _id });
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

exports.postUserLogin = asyncHandler(async (req, res) => {
  const {
    auth: { _id, usersLiked, usersBlocked },
    token,
  } = req;
  const Users = getUsers();
  const cursor = Users.aggregate([addFieldBirthDate]).match({ _id });
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

exports.postUserForgot = asyncHandler(async (req, res, next) => {
  const Users = getUsers();
  const user = await Users.findOne({ email: req.body.email });
  if (!user) return next(new ErrorResponse(400, EMAIL_NOT_FOUND));
  const { _id, email, username } = user;
  const token = createToken({ _id });
  const url = `${req.headers.referer}reset/${token}`;
  await sendEmail(
    email,
    'Password reset',
    `Hello ${username}. Click on this link to reset your password : ${url}`
  );
  res.status(200).send();
});

exports.postUserImage = asyncHandler(async (req, res, next) => {
  const {
    auth: { _id },
  } = req;
  const Users = getUsers();
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 500, fit: 'outside' })
    .png()
    .toBuffer();
  const imageId = ObjectID();
  const { value: user } = await Users.findOneAndUpdate(
    { _id },
    { $push: { images: { _id: imageId, data: buffer } } }
  );
  if (!user) return next(new ErrorResponse(404, USER_NOT_FOUND));
  const [data] = await Users.aggregate([addFieldBirthDate])
    .match({ _id })
    .project(imageProjection)
    .toArray();
  res.send(data);
});

exports.deleteUserImage = asyncHandler(async (req, res, next) => {
  const {
    auth: { _id },
    params: { imageId },
  } = req;
  const Users = getUsers();
  const { value: user } = await Users.findOneAndUpdate(
    { _id },
    { $pull: { images: { _id: imageId } } }
  );
  if (!user) return next(new ErrorResponse(404, USER_NOT_FOUND));
  const [data] = await Users.aggregate([addFieldBirthDate])
    .match({ _id })
    .project(imageProjection)
    .toArray();
  res.send(data);
});

exports.getUserImage = asyncHandler(async (req, res, next) => {
  const Users = getUsers();
  const { id, imageId } = req.params;
  const user = await Users.findOne({ _id: id, 'images._id': imageId });
  if (!user) return next(new ErrorResponse(404, USER_NOT_FOUND));
  const { data } = find(propEq('_id', imageId))(user.images);
  res.type('png');
  res.send(data.buffer);
});
