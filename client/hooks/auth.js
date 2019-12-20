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
} from '../actions';
import { getAuth, getNotifications } from '../selectors';

export const useAuth = () => {
  const dispatch = useDispatch();
  return {
    auth: useSelector(getAuth),
    logout: () => dispatch(logout()),
    login: user => dispatch(login(user)),
    register: user => dispatch(register(user)),
    forgotPassword: user => dispatch(forgotPassword(user)),
    updateUser: (token, user) => dispatch(updateUser(token, user)),
    uploadImage: (account, userLikedId) => dispatch(uploadImage(account, userLikedId)),
    removeImage: (token, imageId) => dispatch(removeImage(token, imageId)),
    likeUser: (account, userLikedId) => dispatch(likeUser(account, userLikedId)),
  };
};

export const useNotifications = () => {
  const dispatch = useDispatch();
  return {
    notifications: useSelector(getNotifications),
    removeNotification: _id => dispatch(removeNotification(_id)),
  };
};
