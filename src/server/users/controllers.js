const { ObjectID } = require('mongodb');
const { find, propEq } = require('ramda');
const sharp = require('sharp');
const {
  match,
  matchIn,
  matchRange,
  sort,
  mismatch,
  geoNear,
  addFieldBirthDate,
  lookup,
  lookupPipeline,
  pagination,
} = require('../utils/stages');
const { userProjection, authProjection, imageProjection } = require('./projections');
const { getUsers } = require('../database');
const { sendEmail } = require('../emails');
const { asyncHandler, compact, ErrorResponse, createToken } = require('../utils/functions');

exports.postUser = asyncHandler(async (req, res) => {
  const Users = getUsers();
  const {
    ops: [user],
  } = await Users.insertOne({ usersBlocked: [], usersLiked: [], ...req.body });
  const { _id, email, username } = user;
  const token = createToken({ _id });
  const url = `${req.headers.referer}verify/${token}`;
  await sendEmail(
    email,
    'Email confirmation',
    `Welcome to Matcha, ${username}. Click on this link to confirm your email : ${url}`,
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
  const [data] = await Users.aggregate(
    compact([
      geoNear(coordinates, maxDistance),
      match('gender', gender),
      matchRange('birthDate', ...birthRange),
      mismatch('_id', usersBlocked),
      mismatch('_id', _id),
      sort(sortBy),
      addFieldBirthDate,
      userProjection,
      ...pagination(limit, skip),
    ]),
  ).toArray();
  res.status(200).send(data);
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const Users = getUsers();
  const [data] = await Users.aggregate(
    compact([match('_id', req.params.id), addFieldBirthDate, userProjection]),
  ).toArray();
  if (!data) next(new ErrorResponse(404, 'User not found'));
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
    { returnOriginal: false },
  );
  if (!user) next(new ErrorResponse(404, 'User not found'));
  const [data] = await Users.aggregate(
    compact([
      match('_id', _id),
      lookup('users', 'usersLiked', '_id', 'usersLiked'),
      lookup('users', 'usersBlocked', '_id', 'usersBlocked'),
      lookupPipeline(
        'users',
        [matchIn('_id', user.usersLiked), match('usersLiked', _id)],
        'friends',
      ),
      addFieldBirthDate,
      authProjection,
    ]),
  ).toArray();
  res.send(data);
});

exports.postUserLogin = asyncHandler(async (req, res) => {
  const {
    auth: { _id, usersLiked },
    token,
  } = req;
  const Users = getUsers();
  const [data] = await Users.aggregate(
    compact([
      match('_id', _id),
      lookup('users', 'usersLiked', '_id', 'usersLiked'),
      lookup('users', 'usersBlocked', '_id', 'usersBlocked'),
      lookupPipeline('users', [matchIn('_id', usersLiked), match('usersLiked', _id)], 'friends'),
      addFieldBirthDate,
      authProjection,
    ]),
  ).toArray();
  res.send({ ...data, token });
});

exports.postUserForgot = asyncHandler(async (req, res, next) => {
  const Users = getUsers();
  const user = await Users.findOne({ email: req.body.email });
  if (!user) next(new ErrorResponse(400, 'Email not found'));
  const { _id, email, username } = user;
  const token = createToken({ _id });
  const url = `${req.headers.referer}reset/${token}`;
  await sendEmail(
    email,
    'Password reset',
    `Hello ${username}. Click on this link to reset your password : ${url}`,
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
    { $push: { images: { _id: imageId, data: buffer } } },
  );
  if (!user) next(new ErrorResponse(404, 'User not found'));
  const [data] = await Users.aggregate(
    compact([match('_id', _id), addFieldBirthDate, imageProjection]),
  ).toArray();
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
    { $pull: { images: { _id: imageId } } },
  );
  if (!user) next(new ErrorResponse(404, 'User not found'));
  const [data] = await Users.aggregate(
    compact([match('_id', _id), addFieldBirthDate, imageProjection]),
  ).toArray();
  res.send(data);
});

exports.getUserImage = asyncHandler(async (req, res, next) => {
  const Users = getUsers();
  const { id, imageId } = req.params;
  const user = await Users.findOne({ _id: id, 'images._id': imageId });
  if (!user) next(new ErrorResponse(404, 'User not found'));
  const { data } = find(image => propEq('_id', imageId)(image))(user.images);
  res.type('png');
  res.send(data.buffer);
});
