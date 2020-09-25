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
  '/image',
  auth.authenticate,
  sanatize.image.single('image'),
  controllers.postUserImage
);

router.get('/:id/image', sanatize.objectId('id'), controllers.getUserImage);

module.exports = router;
