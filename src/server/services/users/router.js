import { Router } from 'express';
import auth from '../../middlewares/auth.js';
import {
  getUserController,
  getUserImageController,
  getUsersController,
  patchUserController,
  postUserController,
  postUserForgotController,
  postUserImageController,
  postUserLoginController,
} from './controllers.js';
import sanatize from '../../middlewares/sanatize.js';
import { apiLimiter, createUserLimiter } from '../../middlewares/limiter.js';

const router = new Router();

router.post(
  '/',
  createUserLimiter,
  sanatize.hash('password'),
  sanatize.toDate('birthDate'),
  sanatize.objectIds('usersLiked'),
  postUserController
);

router.get(
  '/',
  apiLimiter,
  auth.authenticate,
  sanatize.toInt('maxDistance'),
  sanatize.toInt('skip'),
  sanatize.toInt('limit'),
  sanatize.dateRange('birthRange'),
  getUsersController
);

router.get(
  '/:id',
  apiLimiter,
  auth.authenticate,
  sanatize.objectId('id'),
  getUserController
);

router.patch(
  ['/', '/:id'],
  apiLimiter,
  auth.authenticate,
  auth.isMyUser,
  sanatize.objectId('id'),
  sanatize.hash('password'),
  sanatize.toDate('birthDate'),
  sanatize.objectIds('usersLiked'),
  patchUserController
);

router.post(
  '/login',
  apiLimiter,
  auth.generateAuthToken,
  auth.emailVerified,
  postUserLoginController
);

router.post('/forgot', apiLimiter, postUserForgotController);

router.post(
  '/:id/image',
  apiLimiter,
  auth.authenticate,
  auth.isMyUser,
  sanatize.image.single('image'),
  postUserImageController
);

router.get(
  '/:id/image/:imageId',
  apiLimiter,
  sanatize.objectId('id'),
  getUserImageController
);

export default router;
