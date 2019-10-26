const { ObjectID } = require('mongodb');
const { find, propEq, split } = require('ramda');
const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const {
  match,
  matchIn,
  matchRange,
  getLimit,
  getSkip,
  getSort,
  mismatch,
  geoNear,
  addFieldBirthDate,
  lookup,
  lookupPipeline,
} = require('../utils/stages');
const { otherUserProjection, myUserProjection, imageProjection } = require('./projections');
const { Users } = require('../database');
const { sendEmailConfirmation, sendResetPassword } = require('../emails/account');
const { JWT_SECRET } = require('../utils/constants');
const { getAppUrl, asyncHandler, compact, ErrorResponse } = require('../utils/functions');

exports.postUser = asyncHandler(async (req, res) => {
  const { protocol, hostname } = req;
  const UsersCollection = Users();
  const {
    ops: [user],
  } = await UsersCollection.insertOne({ usersBlocked: [], usersLiked: [], ...req.body });
  const { _id, email, firstName, lastName } = user;
  const token = await jwt.sign({ _id }, JWT_SECRET);
  const url = `${getAppUrl(protocol, hostname, req.get('host'))}/verify/${token}`;
  await sendEmailConfirmation(email, firstName, lastName, url);
  res.status(201).send();
});

exports.getUsers = asyncHandler(async (req, res) => {
  const {
    query: { gender, interests, birthRange = '', limit, skip, sortBy, maxDistance },
    myUser: {
      _id,
      usersBlocked,
      address: {
        coordinates: [lng, lat],
      },
    },
  } = req;
  const UsersCollection = Users();
  const [birthMin, birthMax] = split(':')(birthRange);
  const users = await UsersCollection.aggregate(
    compact([
      geoNear(lng, lat, maxDistance),
      match('gender', gender),
      match('interests', interests),
      matchRange('birthDate', new Date(birthMin), new Date(birthMax)),
      mismatch('_id', usersBlocked),
      mismatch('_id', _id),
      getLimit(limit),
      getSkip(skip),
      getSort(sortBy),
      addFieldBirthDate,
      otherUserProjection,
    ]),
  ).toArray();
  res.status(200).send(users);
});

exports.getUser = asyncHandler(async (req, res) => {
  const UsersCollection = Users();
  const [data] = await UsersCollection.aggregate(
    compact([match('_id', req._id), addFieldBirthDate, otherUserProjection]),
  ).toArray();
  if (!data) return res.status(404).send();
  res.send(data);
});

exports.patchUser = asyncHandler(async (req, res) => {
  const {
    myUser: { _id },
    body,
  } = req;
  const UsersCollection = Users();
  const { value: user } = await UsersCollection.findOneAndUpdate(
    { _id },
    { $set: body },
    { returnOriginal: false },
  );
  if (!user) return res.status(404).send();
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
      myUserProjection,
    ]),
  ).toArray();
  res.send(data);
});

exports.postUserLogin = asyncHandler(async (req, res) => {
  const {
    myUser: { _id, usersLiked },
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
      myUserProjection,
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
  const token = await jwt.sign({ _id }, JWT_SECRET);
  const url = `${getAppUrl(protocol, hostname, req.get('host'))}/reset/${token}`;
  await sendResetPassword(email, firstName, lastName, url);
  res.status(200).send();
});

exports.postUserImage = asyncHandler(async (req, res) => {
  const {
    myUser: { _id },
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
  if (!user) return res.status(404).send();
  const [data] = await UsersCollection.aggregate(
    compact([match('_id', _id), addFieldBirthDate, imageProjection]),
  ).toArray();
  res.send(data);
});

exports.deleteUserImage = asyncHandler(async (req, res) => {
  const {
    myUser: { _id },
  } = req;
  const UsersCollection = Users();
  const imageId = ObjectID(req.params.imageId);
  const { value: user } = await UsersCollection.findOneAndUpdate(
    { _id },
    { $pull: { images: { _id: imageId } } },
  );
  if (!user) return res.status(404).send();
  const [data] = await UsersCollection.aggregate(
    compact([match('_id', _id), addFieldBirthDate, imageProjection]),
  ).toArray();
  res.send(data);
});

exports.getUserImage = asyncHandler(async (req, res) => {
  const UsersCollection = Users();
  const imageId = ObjectID(req.params.imageId);
  const user = await UsersCollection.findOne({ _id: req._id, 'images._id': imageId });
  if (!user) return res.status(404).send();
  const { data } = find(image => propEq('_id', imageId)(image))(user.images);
  res.type('png');
  res.send(data.buffer);
});
