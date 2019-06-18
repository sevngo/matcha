import { useDispatch } from 'react-redux';
import {
  removeSnackbar,
  enqueueSnackbar,
  logout,
  register,
  login,
  forgotPassword,
  removeNotification,
  uploadImage,
  removeImage,
  likeUser,
  updateUser,
  handleFilter,
  loadUsers,
} from '../actions';

export const useMyDispatch = () => {
  const dispatch = useDispatch();
  return {
    logout: () => dispatch(logout()),
    login: user => dispatch(login(user)),
    register: user => dispatch(register(user)),
    forgotPassword: user => dispatch(forgotPassword(user)),
    updateUser: user => dispatch(updateUser(user)),
    removeNotification: _id => dispatch(removeNotification(_id)),
    uploadImage: (account, userLikedId) => dispatch(uploadImage(account, userLikedId)),
    removeImage: (token, imageId) => dispatch(removeImage(token, imageId)),
    likeUser: (account, userLikedId) => dispatch(likeUser(account, userLikedId)),
    enqueueSnackbar: snackbar => dispatch(enqueueSnackbar(snackbar)),
    removeSnackbar: key => dispatch(removeSnackbar(key)),
    handleFilter: filter => dispatch(handleFilter(filter)),
    loadUsers: (token, filter) => dispatch(loadUsers(token, filter)),
  };
};
