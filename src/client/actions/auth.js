import { reject, compose, append, equals, pick, find } from 'ramda';
import { openSnackbar } from '.';
import {
  postUser,
  postUserLogin,
  patchUser,
  postUserForgot,
  postUserImage,
  deleteUserImage,
} from '../api';
import { getIds } from '../utils';
import { socket } from '../../index';
import { SUCCESS, ERROR } from '../containers/Snackbar/constants';

export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGGED = 'LOGGED';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATED_USER = 'UPDATED_USER';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const LIKE_USER = 'LIKE_USER';
export const LIKED_USER = 'LIKED_USER';
export const BLOCK_USER = 'BLOCK_USER';
export const BLOCKED_USER = 'BLOCKED_USER';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const UPLOADED_IMAGE = 'UPLOADED_IMAGE';
export const DELETE_IMAGE = 'DELETE_IMAGE';
export const DELETED_IMAGE = 'DELETED_IMAGE';
export const GOT_FRIENDED = 'GOT_FRIENDED';
export const GOT_UNDFRIENDED = 'GOT_UNDFRIENDED';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  socket.emit('logout');
};

export const register = user => async dispatch => {
  try {
    dispatch({ type: REGISTER });
    await postUser(user);
    dispatch(openSnackbar({ variant: SUCCESS }));
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const login = user => async dispatch => {
  try {
    dispatch({ type: LOGIN });
    const { data } = await postUserLogin(user);
    dispatch({ type: LOGGED, data });
    socket.emit('logged', pick(['_id', 'username', 'friends'])(data));
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const updateUser = (token, auth) => async dispatch => {
  try {
    dispatch({ type: UPDATE_USER });
    const { data } = await patchUser(token, auth);
    dispatch({ type: UPDATED_USER, data });
    dispatch(openSnackbar({ variant: SUCCESS }));
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const forgotPassword = auth => async dispatch => {
  try {
    dispatch({ type: FORGOT_PASSWORD });
    await postUserForgot(auth);
    dispatch(openSnackbar({ variant: SUCCESS }));
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const likeUser = (auth, userLikedId) => async dispatch => {
  try {
    dispatch({ type: LIKE_USER });
    const usersLiked = compose(append(userLikedId), getIds)(auth.usersLiked);
    const usersBlocked = compose(reject(equals(userLikedId)), getIds)(auth.usersBlocked);
    const user = { usersLiked, usersBlocked };
    const { data } = await patchUser(auth.token, user);
    dispatch({ type: LIKED_USER, data });
    socket.emit('userLiked', {
      user: pick(['_id', 'username'])(data),
      userLikedId,
    });
    const friendsIds = getIds(data.friends);
    const isFriended = find(friendId => userLikedId === friendId)(friendsIds);
    if (isFriended)
      socket.emit('userFriended', { user: pick(['_id', 'username'])(data), userLikedId });
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const blockUser = (auth, userBlockedId) => async dispatch => {
  try {
    dispatch({ type: BLOCK_USER });
    const usersLiked = compose(reject(equals(userBlockedId)), getIds)(auth.usersLiked);
    const usersBlocked = compose(append(userBlockedId), getIds)(auth.usersBlocked);
    const user = { usersLiked, usersBlocked };
    const { data } = await patchUser(auth.token, user);
    dispatch({ type: BLOCKED_USER, data });
    socket.emit('userBlocked', {
      user: pick(['_id', 'username'])(data),
      userBlockedId,
    });
    const friendsIds = getIds(auth.friends);
    const isUnfriended = find(friendId => userBlockedId === friendId)(friendsIds);
    if (isUnfriended)
      socket.emit('userUnfriended', { user: pick(['_id', 'username'])(data), userBlockedId });
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const uploadImage = (token, image) => async dispatch => {
  try {
    dispatch({ type: UPLOAD_IMAGE });
    const { data } = await postUserImage(token, image);
    dispatch({ type: UPLOADED_IMAGE, data });
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const removeImage = (token, imageId) => async dispatch => {
  try {
    dispatch({ type: DELETE_IMAGE });
    const { data } = await deleteUserImage(token, imageId);
    dispatch({ type: DELETED_IMAGE, data });
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const removeNotification = _id => ({ type: REMOVE_NOTIFICATION, _id });
