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
const { Users } = require('../database');
const { sendEmail } = require('../emails');
const {
  getAppUrl,
  asyncHandler,
  compact,
  ErrorResponse,
  createToken,
} = require('../utils/functions');

exports.postUser = asyncHandler(async (req, res) => {
  const { protocol, hostname } = req;
  const UsersCollection = Users();
  const {
    ops: [user],
  } = await UsersCollection.insertOne({ usersBlocked: [], usersLiked: [], ...req.body });
  const { _id, email, firstName, lastName } = user;
  const token = createToken({ _id });
  const url = `${getAppUrl(protocol, hostname, req.get('host'))}/verify/${token}`;
  await sendEmail(
    email,
    'Email confirmation',
    `Welcome to Matcha, ${firstName} ${lastName}. Click on this link to confirm your email : ${url}`,
  );
  res.status(201).send();
});

exports.getUsers = asyncHandler(async (req, res) => {
  const {
    query: { gender, interests, birthRange, limit, skip, sortBy, maxDistance },
    auth: {
      _id,
      usersBlocked,
      address: { coordinates },
    },
  } = req;
  const UsersCollection = Users();
  const [data] = await UsersCollection.aggregate(
    compact([
      geoNear(coordinates, maxDistance),
      match('gender', gender),
      match('interests', interests),
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
  const UsersCollection = Users();
  const [data] = await UsersCollection.aggregate(
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
  const UsersCollection = Users();
  const { value: user } = await UsersCollection.findOneAndUpdate(
    { _id },
    { $set: body },
    { returnOriginal: false },
  );
  if (!user) next(new ErrorResponse(404, 'User not found'));
  const [data] = await UsersCollection.aggregate(
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
  const UsersCollection = Users();
  const [data] = await UsersCollection.aggregate(
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
  const { protocol, hostname } = req;
  const UsersCollection = Users();
  const user = await UsersCollection.findOne({ email: req.body.email });
  if (!user) next(new ErrorResponse(400, 'Email not found'));
  const { _id, email, firstName, lastName } = user;
  const token = createToken({ _id });
  const url = `${getAppUrl(protocol, hostname, req.get('host'))}/reset/${token}`;
  await sendEmail(
    email,
    'Password reset',
    `Hello ${firstName} ${lastName}. Click on this link to reset your password : ${url}`,
  );
  res.status(200).send();
});

exports.postUserImage = asyncHandler(async (req, res, next) => {
  const {
    auth: { _id },
  } = req;
  const UsersCollection = Users();
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 500, fit: 'outside' })
    .png()
    .toBuffer();
  const imageId = ObjectID();
  const { value: user } = await UsersCollection.findOneAndUpdate(
    { _id },
    { $push: { images: { _id: imageId, data: buffer } } },
  );
  if (!user) next(new ErrorResponse(404, 'User not found'));
  const [data] = await UsersCollection.aggregate(
    compact([match('_id', _id), addFieldBirthDate, imageProjection]),
  ).toArray();
  res.send(data);
});

exports.deleteUserImage = asyncHandler(async (req, res, next) => {
  const {
    auth: { _id },
    params: { imageId },
  } = req;
  const UsersCollection = Users();
  const { value: user } = await UsersCollection.findOneAndUpdate(
    { _id },
    { $pull: { images: { _id: imageId } } },
  );
  if (!user) next(new ErrorResponse(404, 'User not found'));
  const [data] = await UsersCollection.aggregate(
    compact([match('_id', _id), addFieldBirthDate, imageProjection]),
  ).toArray();
  res.send(data);
});

exports.getUserImage = asyncHandler(async (req, res, next) => {
  const UsersCollection = Users();
  const { id, imageId } = req.params;
  const user = await UsersCollection.findOne({ _id: id, 'images._id': imageId });
  if (!user) next(new ErrorResponse(404, 'User not found'));
  const { data } = find(image => propEq('_id', imageId)(image))(user.images);
  res.type('png');
  res.send(data.buffer);
});
