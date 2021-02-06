import { Router } from 'express';
import auth from '../middlewares/auth.js';
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
import sanatize from '../middlewares/sanatize.js';

const router = new Router();

router.post(
  '/',
  sanatize.hash('password'),
  sanatize.toDate('birthDate'),
  sanatize.objectIds('usersLiked'),
  sanatize.objectIds('usersBlocked'),
  postUserController
);

router.get(
  '/',
  auth.authenticate,
  sanatize.toInt('maxDistance'),
  sanatize.toInt('skip'),
  sanatize.toInt('limit'),
  sanatize.dateRange('birthRange'),
  getUsersController
);

router.get(
  '/:id',
  auth.authenticate,
  sanatize.objectId('id'),
  getUserController
);

router.patch(
  ['/', '/:id'],
  auth.authenticate,
  auth.isMyUser,
  sanatize.objectId('id'),
  sanatize.hash('password'),
  sanatize.toDate('birthDate'),
  sanatize.objectIds('usersLiked'),
  sanatize.objectIds('usersBlocked'),
  patchUserController
);

router.post(
  '/login',
  auth.generateAuthToken,
  auth.emailVerified,
  postUserLoginController
);

router.post('/forgot', postUserForgotController);

router.post(
  '/:id/image',
  auth.authenticate,
  auth.isMyUser,
  sanatize.image.single('image'),
  postUserImageController
);

router.get(
  '/:id/image/:imageId',
  sanatize.objectId('id'),
  getUserImageController
);

export default router;
