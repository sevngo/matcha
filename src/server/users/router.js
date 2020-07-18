const { Router } = require('express');
const auth = require('../middlewares/auth');
const { uploadImage } = require('../middlewares/validation');
const controllers = require('./controllers');
const validation = require('./validation');

const router = new Router();

router.post(
  '/',
  validation.bodyValidation,
  validation.bodySanatization,
  controllers.postUser
);

router.get(
  '/',
  validation.queryValidation,
  auth.authenticate,
  controllers.getUsers
);

router.get(
  '/:id',
  validation.paramValidation,
  auth.authenticate,
  controllers.getUser
);

router.patch(
  '/',
  validation.bodyValidation,
  auth.authenticate,
  validation.bodySanatization,
  controllers.patchUser
);

router.post(
  '/login',
  validation.bodyValidation,
  auth.generateAuthToken,
  auth.emailVerified,
  controllers.postUserLogin
);

router.post(
  '/forgot',
  validation.bodyValidation,
  validation.bodySanatization,
  controllers.postUserForgot
);

router.post(
  '/images',
  auth.authenticate,
  uploadImage.single('image'),
  controllers.postUserImage
);

router.delete(
  '/images/:imageId',
  validation.paramValidation,
  controllers.deleteUserImage
);

router.get(
  '/:id/images/:imageId',
  validation.paramValidation,
  controllers.getUserImage
);

module.exports = router;
