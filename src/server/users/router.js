const { Router } = require('express');
const auth = require('../middlewares/auth');
const controllers = require('./controllers');
const sanatize = require('../middlewares/sanatize');

const router = new Router();

router.post(
  '/',
  sanatize.hash('password'),
  sanatize.toDate('birthDate'),
  sanatize.objectIds('usersLiked'),
  sanatize.objectIds('usersBlocked'),
  controllers.postUser
);

router.get(
  '/',
  sanatize.toInt('maxDistance'),
  sanatize.toInt('skip'),
  sanatize.toInt('limit'),
  sanatize.dateRange('birthRange'),
  auth.authenticate,
  controllers.getUsers
);

router.get(
  '/:id',
  sanatize.objectId('id'),
  auth.authenticate,
  controllers.getUser
);

router.patch(
  '/',
  auth.authenticate,
  sanatize.hash('password'),
  sanatize.toDate('birthDate'),
  sanatize.objectIds('usersLiked'),
  sanatize.objectIds('usersBlocked'),
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
  sanatize.image.single('image'),
  controllers.postUserImage
);

router.delete(
  '/images/:imageId',
  sanatize.objectId('imageId'),
  controllers.deleteUserImage
);

router.get(
  '/:id/images/:imageId',
  sanatize.objectId('id'),
  sanatize.objectId('imageId'),
  controllers.getUserImage
);

module.exports = router;
