const { Router } = require('express');
const { ObjectID } = require('mongodb');
const { omit, find, propEq } = require('ramda');
const multer = require('multer');
const sharp = require('sharp');
const {
  isValidObjectId,
  hashPassword,
  generateAuthToken,
  auth,
  isMyId,
  query,
  newObjectId,
  hashNewPassword,
} = require('../middlewares');
const { Users } = require('../database');

const router = new Router();

const projection = { password: 0, email: 0, 'images.data': 0 };

router.post('/', hashPassword, async (req, res) => {
  try {
    await Users().insertOne(req.body);
    res.status(201).send();
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/', auth, query, async (req, res) => {
  try {
    const { filter, limit, skip, sort } = req;
    const users = await Users()
      .find(filter, { projection })
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .toArray();
    res.status(200).send(users);
  } catch {
    res.status(500).send();
  }
});

router.get('/:id', auth, isValidObjectId, newObjectId, async (req, res) => {
  try {
    const user = await Users().findOne({ _id: req.id }, { projection });
    if (!user) return res.status(404).send();
    res.send(user);
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
  hashNewPassword,
  async (req, res) => {
    try {
      const { value: user } = await Users().findOneAndUpdate(
        { _id: req.id },
        { $set: req.body },
        { returnOriginal: false, projection: { password: 0 } },
      );
      if (!user) return res.status(404).send();
      res.send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  },
);

router.delete('/:id', auth, isValidObjectId, isMyId, newObjectId, async (req, res) => {
  try {
    const { value: user } = await Users().findOneAndDelete({ _id: req.id }, { projection });
    if (!user) return res.status(404).send();
    res.send(user);
  } catch {
    res.status(500).send();
  }
});

router.post('/login', generateAuthToken, (req, res) => {
  const { myUser, token } = req;
  res.send({ ...omit(['password'])(myUser), token });
  res.status(400).send();
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/))
      return cb(new Error('Please upload an image'));
    cb(undefined, true);
  },
});

router.post(
  '/:id/images',
  upload.single('image'),
  newObjectId,
  async (req, res) => {
    try {
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 500, fit: 'outside' })
        .png()
        .toBuffer();
      const imageId = new ObjectID();
      const { value: user } = await Users().findOneAndUpdate(
        { _id: req.id },
        { $push: { images: { _id: imageId, data: buffer } } },
        { returnOriginal: false, projection: { password: 0 } },
      );
      if (!user) return res.status(404).send();
      res.send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  },
  // eslint-disable-next-line no-unused-vars
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  },
);

router.delete('/:id/images/:imageId', newObjectId, async (req, res) => {
  try {
    const imageId = new ObjectID(req.params.imageId);
    const { value: user } = await Users().findOneAndUpdate(
      { _id: req.id },
      { $pull: { images: { _id: imageId } } },
      { returnOriginal: false, projection: { password: 0 } },
    );
    if (!user) return res.status(404).send();
    res.send(user);
  } catch {
    res.status(500).send();
  }
});

router.get('/:id/images/:imageId', newObjectId, async (req, res) => {
  try {
    const imageId = new ObjectID(req.params.imageId);
    const user = await Users().findOne({ _id: req.id, 'images._id': imageId });
    if (!user) return res.status(404).send();
    const { data } = find(image => propEq('_id', imageId)(image))(user.images);
    res.type('png');
    res.send(data.buffer);
  } catch {
    res.status(500).send();
  }
});

module.exports = router;
