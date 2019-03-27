const { Router } = require('express');
const { ObjectID } = require('mongodb');
const { omit, split } = require('ramda');
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

const projection = { password: 0, email: 0 };

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
  const { myAccount, token } = req;
  res.send({ ...omit(['password'])(myAccount), token });
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
        .png()
        .toBuffer();
      const imageId = new ObjectID();
      const { value: user } = await Users().findOneAndUpdate(
        { _id: req.id },
        { $push: { images: { _id: imageId, buffer } } },
        { returnOriginal: false, projection },
      );
      if (!user) return res.status(404).send();
      res.send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  },
);

router.delete('/:id/images', newObjectId, async (req, res) => {
  try {
    const { value: user } = await Users().findOneAndUpdate(
      { _id: req.id },
      { $unset: { images: '' } },
      { returnOriginal: false, projection },
    );
    if (!user) return res.status(404).send();
    res.send(user);
  } catch {
    res.status(500).send();
  }
});

router.get('/:id/images', async (req, res) => {
  try {
    const _id = new ObjectID(req.params.id);
    const user = await Users().findOne({ _id });
    if (!user || !user.images) throw new Error();
    res.type('png');
    res.send(user.images.buffer);
  } catch {
    res.status(404).send();
  }
});

module.exports = router;
