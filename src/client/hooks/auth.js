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
import { getAuth, getNotifications } from '../selectors';

export const useAuth = () => {
  const dispatch = useDispatch();
  return {
    auth: useSelector(getAuth),
    logout: useCallback(() => dispatch(logout()), [dispatch]),
    login: useCallback(user => dispatch(login(user)), [dispatch]),
    register: useCallback(user => dispatch(register(user)), [dispatch]),
    forgotPassword: useCallback(user => dispatch(forgotPassword(user)), [dispatch]),
    updateUser: useCallback((token, user) => dispatch(updateUser(token, user)), [dispatch]),
    uploadImage: useCallback(
      (account, userLikedId) => dispatch(uploadImage(account, userLikedId)),
      [dispatch],
    ),
    removeImage: useCallback((token, imageId) => dispatch(removeImage(token, imageId)), [dispatch]),
    likeUser: useCallback((account, userLikedId) => dispatch(likeUser(account, userLikedId)), [
      dispatch,
    ]),
    blockUser: useCallback((auth, userBlockedId) => dispatch(blockUser(auth, userBlockedId)), [
      dispatch,
    ]),
  };
};

export const useNotifications = () => {
  const dispatch = useDispatch();
  return {
    notifications: useSelector(getNotifications),
    removeNotification: useCallback(_id => dispatch(removeNotification(_id)), [dispatch]),
  };
};
