const { Router } = require('express');
const conversions = require('../middlewares/conversions');
const auth = require('../middlewares/auth');
const stages = require('../middlewares/stages');
const controllers = require('./controllers');

const router = new Router();

router.post('/', conversions.newDateBirth, conversions.hashPassword, controllers.postUser);

router.get(
  '/',
  auth.authenticate,
  stages.maxDistance,
  stages.matchGender,
  stages.matchInterests,
  stages.matchBirthRange,
  stages.mismatchUsersBlocked,
  stages.mismatchMyUser,
  stages.limit,
  stages.skip,
  stages.sort,
  controllers.getUsers,
);

router.get(
  '/:id',
  auth.authenticate,
  auth.isValidObjectId,
  conversions.newObjectId,
  controllers.getUser,
);

router.patch(
  '/',
  auth.authenticate,
  conversions.trimBody,
  conversions.newDateBirth,
  conversions.hashNewPassword,
  conversions.newUsersLikedId,
  conversions.newUsersBlockedId,
  stages.lookupUsersLiked,
  stages.lookupUsersBlocked,
  controllers.patchUser,
);

router.post(
  '/login',
  conversions.trimBody,
  auth.generateAuthToken,
  auth.emailVerified,
  stages.lookupUsersLiked,
  stages.lookupUsersBlocked,
  controllers.postUserLogin,
);

router.post('/forgot', conversions.trimBody, controllers.postUserForgot);

router.post(
  '/images',
  auth.authenticate,
  conversions.uploadImage.single('image'),
  controllers.postUserImage,
);

router.delete('/images/:imageId', auth.authenticate, controllers.deleteUserImage);

router.get(
  '/:id/images/:imageId',
  auth.isValidObjectId,
  conversions.newObjectId,
  controllers.getUserImage,
);

module.exports = router;
