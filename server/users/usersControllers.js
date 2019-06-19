const { ObjectID } = require('mongodb');
const { find, propEq } = require('ramda');
const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const { usersPipeline, matchById, project } = require('../utils/functions');
const { Users } = require('../database');
const { sendEmailConfirmation, sendResetPassword } = require('../emails/account');
const { JWT_SECRET } = require('../utils/constants');
const { getAppUrl, getIds } = require('../utils/functions');

exports.postUsers = async (req, res) => {
  try {
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
  } catch (e) {
    res.status(400).send();
    console.log(e); // eslint-disable-line no-console
  }
};

exports.getUsers = async (req, res) => {
  try {
    const {
      maxDistance,
      matchGender,
      matchInterests,
      limit,
      skip,
      sort,
      matchBirthRange,
      mismatchMyUser,
      mismatchUsersBlocked,
    } = req;
    const UsersCollection = Users();
    const projection = project({ password: 0, 'images.data': 0, email: 0 });
    const users = await UsersCollection.aggregate(
      usersPipeline(
        maxDistance,
        matchGender,
        matchInterests,
        matchBirthRange,
        mismatchUsersBlocked,
        mismatchMyUser,
        limit,
        skip,
        sort,
        projection,
      ),
    ).toArray();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send();
    console.log(e); // eslint-disable-line no-console
  }
};

exports.getUser = async (req, res) => {
  try {
    const UsersCollection = Users();
    const projection = project({ password: 0, 'images.data': 0, email: 0 });
    const [data] = await UsersCollection.aggregate(
      usersPipeline(matchById(req._id), projection),
    ).toArray();
    if (!data) return res.status(404).send();
    res.send(data);
  } catch (e) {
    res.status(500).send();
    console.log(e); // eslint-disable-line no-console
  }
};

exports.patchUsers = async (req, res) => {
  try {
    const {
      myUser: { _id },
      body,
      lookupUsersLiked,
      lookupUsersBlocked,
    } = req;
    const UsersCollection = Users();
    const { value: user } = await UsersCollection.findOneAndUpdate({ _id }, { $set: body });
    if (!user) return res.status(404).send();
    const projection = project({
      password: 0,
      'images.data': 0,
      'usersBlocked.password': 0,
      'usersBlocked.email': 0,
      'usersBlocked.images.data': 0,
      'usersLiked.password': 0,
      'usersLiked.email': 0,
      'usersLiked.images.data': 0,
    });
    const [data] = await UsersCollection.aggregate(
      usersPipeline(matchById(_id), lookupUsersLiked, lookupUsersBlocked, projection),
    ).toArray();
    const usersLikedIds = getIds(data.usersLiked);
    const friends = await UsersCollection.aggregate([
      { $match: { _id: { $in: usersLikedIds } } },
      { $match: { usersLiked: ObjectID(data._id) } },
      projection,
    ]).toArray();
    res.send({ ...data, friends });
  } catch (e) {
    res.status(400).send();
    console.log(e); // eslint-disable-line no-console
  }
};

exports.postUsersLogin = async (req, res) => {
  try {
    const {
      myUser: { _id, usersLiked },
      token,
      lookupUsersLiked,
      lookupUsersBlocked,
    } = req;
    const UsersCollection = Users();
    const projection = project({
      password: 0,
      'images.data': 0,
      'usersBlocked.password': 0,
      'usersBlocked.email': 0,
      'usersBlocked.images.data': 0,
      'usersLiked.password': 0,
      'usersLiked.email': 0,
      'usersLiked.images.data': 0,
    });
    const [data] = await UsersCollection.aggregate(
      usersPipeline(matchById(_id), lookupUsersLiked, lookupUsersBlocked, projection),
    ).toArray();
    const friends = await UsersCollection.aggregate([
      { $match: { _id: { $in: usersLiked } } },
      { $match: { usersLiked: ObjectID(data._id) } },
      projection,
    ]).toArray();
    res.send({ ...data, friends, token });
  } catch (e) {
    res.status(400).send();
    console.log(e); // eslint-disable-line no-console
  }
};

exports.postUsersForgot = async (req, res) => {
  try {
    const { protocol, hostname } = req;
    const UsersCollection = Users();
    const user = await UsersCollection.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const { _id, email, firstName, lastName } = user;
    const token = await jwt.sign({ _id }, JWT_SECRET);
    const url = `${getAppUrl(protocol, hostname, req.get('host'))}/reset/${token}`;
    await sendResetPassword(email, firstName, lastName, url);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
    console.log(e); // eslint-disable-line no-console
  }
};

exports.postUsersImages = async (req, res) => {
  try {
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
    const projection = project({ password: 0, 'images.data': 0 });
    const [data] = await UsersCollection.aggregate(
      usersPipeline(matchById(_id), projection),
    ).toArray();
    res.send(data);
  } catch (e) {
    res.status(400).send();
    console.log(e); // eslint-disable-line no-console
  }
};

exports.deleteUsersImages = async (req, res) => {
  try {
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
    const projection = project({ password: 0, 'images.data': 0 });
    const [data] = await UsersCollection.aggregate(
      usersPipeline(matchById(_id), projection),
    ).toArray();
    res.send(data);
  } catch (e) {
    res.status(500).send();
    console.log(e); // eslint-disable-line no-console
  }
};

exports.getUsersImages = async (req, res) => {
  try {
    const UsersCollection = Users();
    const imageId = ObjectID(req.params.imageId);
    const user = await UsersCollection.findOne({ _id: req._id, 'images._id': imageId });
    if (!user) return res.status(404).send();
    const { data } = find(image => propEq('_id', imageId)(image))(user.images);
    res.type('png');
    res.send(data.buffer);
  } catch (e) {
    res.status(500).send();
    console.log(e); // eslint-disable-line no-console
  }
};
