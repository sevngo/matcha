const { Router } = require('express');
const auth = require('../middlewares/auth');
const sanatize = require('../middlewares/sanatize');
const validate = require('../middlewares/validate');
const controllers = require('./controllers');

const router = new Router();

router.post(
  '/',
  sanatize.newDate('birthDate'),
  sanatize.hash('password'),
  controllers.postUser
);

router.get(
  '/',
  sanatize.toInt('maxDistance'),
  sanatize.toInt('skip'),
  sanatize.toInt('limit'),
  sanatize.birthRange,
  auth.authenticate,
  controllers.getUsers
);

router.get(
  '/:id',
  validate.isValidObjectId('id'),
  sanatize.objectId('id'),
  auth.authenticate,
  controllers.getUser
);

router.patch(
  '/',
  auth.authenticate,
  sanatize.newDate('birthDate'),
  sanatize.hash('password'),
  sanatize.objectIds('usersLiked'),
  sanatize.objectIds('usersBlocked'),
  sanatize.newPassword,
  controllers.patchUser
);

router.post(
  '/login',
  auth.generateAuthToken,
  auth.emailVerified,
  controllers.postUserLogin
);

router.post('/forgot', controllers.postUserForgot);

router.post(
  '/images',
  auth.authenticate,
  sanatize.uploadImage.single('image'),
  controllers.postUserImage
);

router.delete(
  '/images/:imageId',
  validate.isValidObjectId('imageId'),
  sanatize.objectId('imageId'),
  controllers.deleteUserImage
);

router.get(
  '/:id/images/:imageId',
  validate.isValidObjectId('id'),
  validate.isValidObjectId('imageId'),
  sanatize.objectId('id'),
  sanatize.objectId('imageId'),
  controllers.getUserImage
);

module.exports = router;
