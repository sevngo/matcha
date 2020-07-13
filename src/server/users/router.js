const { Router } = require('express');
const { body } = require('express-validator');
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth');
const { uploadImage } = require('../middlewares/validation');
const controllers = require('./controllers');
const validation = require('./validation');

const router = new Router();

router.post(
  '/',
  validation.bodyValidation,
  body('password')
    .exists()
    .bail()
    .customSanitizer((value) => bcrypt.hashSync(value, 8)),
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
  body('newPassword')
    .optional()
    .customSanitizer((value) => bcrypt.hashSync(value, 8)),
  controllers.patchUser
);

router.post(
  '/login',
  validation.bodyValidation,
  auth.generateAuthToken,
  auth.emailVerified,
  controllers.postUserLogin
);

router.post('/forgot', controllers.postUserForgot);

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
