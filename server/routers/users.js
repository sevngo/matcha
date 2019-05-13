const { Router } = require('express');
const { ObjectID } = require('mongodb');
const { find, propEq } = require('ramda');
const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const {
  isValidObjectId,
  hashPassword,
  newObjectId,
  hashNewPassword,
  newDateBirth,
  uploadImage,
  trimBody,
  newUsersLikedId,
  newUsersDislikedId,
} = require('../middlewares/data');
const { generateAuthToken, auth, emailVerified } = require('../middlewares/auth');
const {
  maxDistance,
  gender,
  interests,
  birthRange,
  limit,
  skip,
  sort,
  notMyUser,
  lookupUsersLiked,
  lookupUsersDisliked,
  hideUsersDisliked,
} = require('../middlewares/stages');
const { usersPipeline, matchById, project } = require('../aggregations/users');
const { Users } = require('../database');
const { sendEmailConfirmation, sendResetPassword } = require('../emails/account');
const { JWT_SECRET } = require('../utils/constants');
const { getAppUrl } = require('../utils/functions');

const router = new Router();

router.post('/', newDateBirth, hashPassword, async (req, res) => {
  try {
    const {
      ops: [user],
    } = await Users().insertOne({ usersDisliked: [], usersLiked: [], ...req.body });
    const { _id, email, firstName, lastName } = user;
    const token = await jwt.sign({ _id }, JWT_SECRET);
    const url = `${getAppUrl(req)}/verify/${token}`;
    await sendEmailConfirmation(email, firstName, lastName, url);
    res.status(201).send();
  } catch (e) {
    res.status(400).send();
    console.log(e); // eslint-disable-line no-console
  }
});

router.get(
  '/',
  auth,
  maxDistance,
  gender,
  interests,
  birthRange,
  hideUsersDisliked,
  notMyUser,
  limit,
  skip,
  sort,
  async (req, res) => {
    try {
      const {
        maxDistance,
        gender,
        interests,
        limit,
        skip,
        sort,
        birthRange,
        notMyUser,
        hideUsersDisliked,
      } = req;
      const projection = project({ password: 0, 'images.data': 0, email: 0 });
      const users = await Users()
        .aggregate(
          usersPipeline(
            maxDistance,
            gender,
            interests,
            birthRange,
            hideUsersDisliked,
            notMyUser,
            limit,
            skip,
            sort,
            projection,
          ),
        )
        .toArray();
      res.status(200).send(users);
    } catch (e) {
      res.status(500).send();
      console.log(e); // eslint-disable-line no-console
    }
  },
);

router.get('/:id', auth, isValidObjectId, newObjectId, async (req, res) => {
  try {
    const projection = project({ password: 0, 'images.data': 0, email: 0 });
    const [data] = await Users()
      .aggregate(usersPipeline(matchById(req._id), projection))
      .toArray();
    if (!data) return res.status(404).send();
    res.send(data);
  } catch (e) {
    res.status(500).send();
    console.log(e); // eslint-disable-line no-console
  }
});

router.patch(
  '/',
  auth,
  trimBody,
  newDateBirth,
  hashNewPassword,
  newUsersLikedId,
  newUsersDislikedId,
  lookupUsersLiked,
  lookupUsersDisliked,
  async (req, res) => {
    try {
      const {
        user: { _id },
        body,
        lookupUsersLiked,
        lookupUsersDisliked,
      } = req;
      const { value: user } = await Users().findOneAndUpdate({ _id }, { $set: body });
      if (!user) return res.status(404).send();
      const projection = project({
        password: 0,
        'images.data': 0,
        'usersDisliked.password': 0,
        'usersDisliked.email': 0,
        'usersDisliked.images.data': 0,
        'usersLiked.password': 0,
        'usersLiked.email': 0,
        'usersLiked.images.data': 0,
      });
      const [data] = await Users()
        .aggregate(usersPipeline(matchById(_id), lookupUsersLiked, lookupUsersDisliked, projection))
        .toArray();
      res.send(data);
    } catch (e) {
      res.status(400).send();
      console.log(e); // eslint-disable-line no-console
    }
  },
);

router.delete('/', auth, async (req, res) => {
  try {
    const {
      user: { _id },
    } = req;
    const { value: user } = await Users().findOneAndDelete({ _id });
    if (!user) return res.status(404).send();
    const projection = project({ password: 0, 'images.data': 0 });
    const [data] = await Users()
      .aggregate(usersPipeline(matchById(_id), projection))
      .toArray();
    res.send(data);
  } catch (e) {
    res.status(500).send();
    console.log(e); // eslint-disable-line no-console
  }
});

router.post(
  '/login',
  trimBody,
  generateAuthToken,
  emailVerified,
  lookupUsersLiked,
  lookupUsersDisliked,
  async (req, res) => {
    try {
      const { user, token, lookupUsersLiked, lookupUsersDisliked } = req;
      const projection = project({
        password: 0,
        'images.data': 0,
        'usersDisliked.password': 0,
        'usersDisliked.email': 0,
        'usersDisliked.images.data': 0,
        'usersLiked.password': 0,
        'usersLiked.email': 0,
        'usersLiked.images.data': 0,
      });
      const [data] = await Users()
        .aggregate(
          usersPipeline(matchById(user._id), lookupUsersLiked, lookupUsersDisliked, projection),
        )
        .toArray();
      res.send({ ...data, token });
    } catch (e) {
      res.status(400).send();
      console.log(e); // eslint-disable-line no-console
    }
  },
);

router.post('/forgot', trimBody, async (req, res) => {
  try {
    const user = await Users().findOne({ email: req.body.email });
    if (!user) throw new Error();
    const { _id, email, firstName, lastName } = user;
    const token = await jwt.sign({ _id }, JWT_SECRET);
    const url = `${getAppUrl(req)}/reset/${token}`;
    await sendResetPassword(email, firstName, lastName, url);
    res.status(200).send();
  } catch (e) {
    res.status(400).send();
    console.log(e); // eslint-disable-line no-console
  }
});

router.post(
  '/images',
  auth,
  uploadImage.single('image'),
  async (req, res) => {
    try {
      const {
        user: { _id },
      } = req;
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 500, fit: 'outside' })
        .png()
        .toBuffer();
      const imageId = ObjectID();
      const { value: user } = await Users().findOneAndUpdate(
        { _id },
        { $push: { images: { _id: imageId, data: buffer } } },
      );
      if (!user) return res.status(404).send();
      const projection = project({ password: 0, 'images.data': 0 });
      const [data] = await Users()
        .aggregate(usersPipeline(matchById(_id), projection))
        .toArray();
      res.send(data);
    } catch (e) {
      res.status(400).send();
      console.log(e); // eslint-disable-line no-console
    }
  },
  // eslint-disable-next-line no-unused-vars
  (error, req, res, next) => {
    res.status(400).send();
    console.log(error); // eslint-disable-line no-console
  },
);

router.delete('/images/:imageId', auth, async (req, res) => {
  try {
    const {
      user: { _id },
    } = req;
    const imageId = ObjectID(req.params.imageId);
    const { value: user } = await Users().findOneAndUpdate(
      { _id },
      { $pull: { images: { _id: imageId } } },
    );
    if (!user) return res.status(404).send();
    const projection = project({ password: 0, 'images.data': 0 });
    const [data] = await Users()
      .aggregate(usersPipeline(matchById(_id), projection))
      .toArray();
    res.send(data);
  } catch (e) {
    res.status(500).send();
    console.log(e); // eslint-disable-line no-console
  }
});

router.get('/:id/images/:imageId', newObjectId, async (req, res) => {
  try {
    const imageId = ObjectID(req.params.imageId);
    const user = await Users().findOne({ _id: req._id, 'images._id': imageId });
    if (!user) return res.status(404).send();
    const { data } = find(image => propEq('_id', imageId)(image))(user.images);
    res.type('png');
    res.send(data.buffer);
  } catch (e) {
    res.status(500).send();
    console.log(e); // eslint-disable-line no-console
  }
});

module.exports = router;
