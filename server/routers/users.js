const { Router } = require('express');
const {
  isValidObjectId,
  hashPassword,
  newObjectId,
  hashNewPassword,
  newDateBirth,
  uploadImage,
  trimBody,
  newUsersLikedId,
  newUsersDislikedId,
} = require('../middlewares/data');
const { generateAuthToken, auth, emailVerified } = require('../middlewares/auth');
const {
  maxDistance,
  gender,
  interests,
  birthRange,
  limit,
  skip,
  sort,
  notMyUser,
  lookupUsersLiked,
  lookupUsersDisliked,
  hideUsersDisliked,
} = require('../middlewares/stages');

const {
  postUsers,
  getUsers,
  getUser,
  patchUsers,
  postUsersLogin,
  postUsersForgot,
  postUsersImages,
  deleteUsersImages,
  getUsersImages,
} = require('../controllers/users');

const router = new Router();

router.post('/', newDateBirth, hashPassword, postUsers);

router.get(
  '/',
  auth,
  maxDistance,
  gender,
  interests,
  birthRange,
  hideUsersDisliked,
  notMyUser,
  limit,
  skip,
  sort,
  getUsers,
);

router.get('/:id', auth, isValidObjectId, newObjectId, getUser);

router.patch(
  '/',
  auth,
  trimBody,
  newDateBirth,
  hashNewPassword,
  newUsersLikedId,
  newUsersDislikedId,
  lookupUsersLiked,
  lookupUsersDisliked,
  patchUsers,
);

router.post(
  '/login',
  trimBody,
  generateAuthToken,
  emailVerified,
  lookupUsersLiked,
  lookupUsersDisliked,
  postUsersLogin,
);

router.post('/forgot', trimBody, postUsersForgot);

router.post(
  '/images',
  auth,
  uploadImage.single('image'),
  postUsersImages,
  // eslint-disable-next-line no-unused-vars
  (error, req, res, next) => {
    res.status(400).send();
    console.log(error); // eslint-disable-line no-console
  },
);

router.delete('/images/:imageId', auth, deleteUsersImages);

router.get('/:id/images/:imageId', newObjectId, getUsersImages);

module.exports = router;
