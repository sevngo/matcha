import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  logout,
  register,
  login,
  forgotPassword,
  updateUser,
  uploadImage,
  removeImage,
  likeUser,
  removeNotification,
  blockUser,
} from '../actions';
import {
  getNotifications,
  getUsersBlocked,
  getFriends,
  getUsersLiked,
  getImages,
  getToken,
  getId,
  getUsername,
  getBirthDate,
  getEmail,
  getGender,
  getAddress,
} from '../selectors';

export const useAuth = () => {
  const dispatch = useDispatch();
  return {
    auth: {
      _id: useSelector(getId),
      username: useSelector(getUsername),
      birthDate: useSelector(getBirthDate),
      email: useSelector(getEmail),
      gender: useSelector(getGender),
      address: useSelector(getAddress),
    },
    logout: useCallback(() => dispatch(logout()), [dispatch]),
    login: useCallback(user => dispatch(login(user)), [dispatch]),
    register: useCallback(user => dispatch(register(user)), [dispatch]),
    forgotPassword: useCallback(user => dispatch(forgotPassword(user)), [dispatch]),
    updateUser: useCallback((token, user) => dispatch(updateUser(token, user)), [dispatch]),
  };
};

export const useToken = () => useSelector(getToken);

export const useImages = () => {
  const dispatch = useDispatch();
  return {
    images: useSelector(getImages),
    uploadImage: useCallback(userLikedId => dispatch(uploadImage(userLikedId)), [dispatch]),
    removeImage: useCallback(imageId => dispatch(removeImage(imageId)), [dispatch]),
  };
};

export const useRelations = () => {
  const dispatch = useDispatch();
  return {
    usersBlocked: useSelector(getUsersBlocked),
    usersLiked: useSelector(getUsersLiked),
    friends: useSelector(getFriends),
    likeUser: useCallback(userLikedId => dispatch(likeUser(userLikedId)), [dispatch]),
    blockUser: useCallback(userBlockedId => dispatch(blockUser(userBlockedId)), [dispatch]),
  };
};

export const useNotifications = () => {
  const dispatch = useDispatch();
  return {
    notifications: useSelector(getNotifications),
    removeNotification: useCallback(_id => dispatch(removeNotification(_id)), [dispatch]),
  };
};
