const { Router } = require('express');
const { ObjectID } = require('mongodb');
const { find, propEq } = require('ramda');
const sharp = require('sharp');
const {
  isValidObjectId,
  hashPassword,
  newObjectId,
  hashNewPassword,
  newDateBirth,
  uploadImage,
} = require('../middlewares/data');
const { generateAuthToken, auth, isMyId } = require('../middlewares/auth');
const { gender, interests, birthRange, limit, skip, sort } = require('../middlewares/query');
const { usersPipeline, matchById, project } = require('../aggregations/users');
const { Users } = require('../database');

const router = new Router();

router.post('/', newDateBirth, hashPassword, async (req, res) => {
  try {
    await Users().insertOne(req.body);
    res.status(201).send();
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/', auth, gender, interests, birthRange, limit, skip, sort, async (req, res) => {
  try {
    const { gender, interests, limit, skip, sort, birthRange } = req;
    const projection = project({ password: 0, 'images.data': 0, email: 0 });
    const users = await Users()
      .aggregate(usersPipeline(gender, interests, birthRange, limit, skip, sort, projection))
      .toArray();
    res.status(200).send(users);
  } catch {
    res.status(500).send();
  }
});

router.get('/:id', auth, isValidObjectId, newObjectId, async (req, res) => {
  try {
    const projection = project({ password: 0, 'images.data': 0, email: 0 });
    const [data] = await Users()
      .aggregate(usersPipeline(matchById(req._id), projection))
      .toArray();
    if (!data) return res.status(404).send();
    res.send(data);
  } catch {
    res.status(500).send();
  }
});

router.patch(
  '/:id',
  auth,
  isValidObjectId,
  isMyId,
  newObjectId,
  newDateBirth,
  hashNewPassword,
  async (req, res) => {
    try {
      const { _id } = req;
      const { value: user } = await Users().findOneAndUpdate({ _id }, { $set: req.body });
      if (!user) return res.status(404).send();
      const projection = project({ password: 0, 'images.data': 0 });
      const [data] = await Users()
        .aggregate(usersPipeline(matchById(_id), projection))
        .toArray();
      res.send(data);
    } catch (e) {
      res.status(400).send(e);
    }
  },
);

router.delete('/:id', auth, isValidObjectId, isMyId, newObjectId, async (req, res) => {
  try {
    const { _id } = req;
    const { value: user } = await Users().findOneAndDelete({ _id });
    if (!user) return res.status(404).send();
    const projection = project({ password: 0, 'images.data': 0 });
    const [data] = await Users()
      .aggregate(usersPipeline(matchById(_id), projection))
      .toArray();
    res.send(data);
  } catch {
    res.status(500).send();
  }
});

router.post('/login', generateAuthToken, async (req, res) => {
  const { user, token } = req;
  const projection = project({ password: 0, 'images.data': 0 });
  const [data] = await Users()
    .aggregate(usersPipeline(matchById(user._id), projection))
    .toArray();
  res.send({ ...data, token });
  res.status(400).send();
});

router.post(
  '/:id/images',
  auth,
  isValidObjectId,
  isMyId,
  newObjectId,
  uploadImage.single('image'),
  async (req, res) => {
    try {
      const { _id } = req;
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 500, fit: 'outside' })
        .png()
        .toBuffer();
      const imageId = new ObjectID();
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
      res.status(400).send(e);
    }
  },
  // eslint-disable-next-line no-unused-vars
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  },
);

router.delete(
  '/:id/images/:imageId',
  auth,
  isValidObjectId,
  isMyId,
  newObjectId,
  async (req, res) => {
    try {
      const { _id } = req;
      const imageId = new ObjectID(req.params.imageId);
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
    } catch {
      res.status(500).send();
    }
  },
);

router.get('/:id/images/:imageId', newObjectId, async (req, res) => {
  try {
    const imageId = new ObjectID(req.params.imageId);
    const user = await Users().findOne({ _id: req._id, 'images._id': imageId });
    if (!user) return res.status(404).send();
    const { data } = find(image => propEq('_id', imageId)(image))(user.images);
    res.type('png');
    res.send(data.buffer);
  } catch {
    res.status(500).send();
  }
});

module.exports = router;
