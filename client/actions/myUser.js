import { reject, compose, append, equals, pick, find } from 'ramda';
import { openSnackbar } from './';
import {
  postUser,
  postUserLogin,
  patchUser,
  postUserForgot,
  postUserImage,
  deleteUserImage,
} from '../api';
import { getIds } from '../utils';
import { socket } from '../index';
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
    const { data: myUser } = await postUserLogin(user);
    dispatch({ type: LOGGED, myUser });
    socket.emit('logged', pick(['_id', 'username', 'friends'])(myUser.data));
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const updateUser = account => async dispatch => {
  try {
    dispatch({ type: UPDATE_USER });
    const user = pick([
      'username',
      'birthDate',
      'firstName',
      'lastName',
      'email',
      'newPassword',
      'gender',
      'address',
      'emailVerified',
      'interests',
      'biography',
    ])(account);
    const { data: myUser } = await patchUser(account.token, user);
    dispatch({ type: UPDATED_USER, myUser });
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const forgotPassword = user => async dispatch => {
  try {
    dispatch({ type: FORGOT_PASSWORD });
    await postUserForgot(user);
    dispatch(openSnackbar({ variant: SUCCESS }));
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const likeUser = (account, userLikedId) => async dispatch => {
  try {
    dispatch({ type: LIKE_USER });
    const usersLiked = compose(
      append(userLikedId),
      getIds,
    )(account.usersLiked);
    const usersBlocked = compose(
      reject(equals(userLikedId)),
      getIds,
    )(account.usersBlocked);
    const user = { usersLiked, usersBlocked };
    const { data: myUser } = await patchUser(account.token, user);
    dispatch({ type: LIKED_USER, myUser });
    socket.emit('userLiked', {
      user: pick(['_id', 'username'])(myUser),
      userLikedId,
    });
    const friendsIds = getIds(myUser.friends);
    const isFriended = find(friendId => userLikedId === friendId)(friendsIds);
    if (isFriended)
      socket.emit('userFriended', { user: pick(['_id', 'username'])(myUser), userLikedId });
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const blockUser = (account, userBlockedId) => async dispatch => {
  try {
    dispatch({ type: BLOCK_USER });
    const usersLiked = compose(
      reject(equals(userBlockedId)),
      getIds,
    )(account.usersLiked);
    const usersBlocked = compose(
      append(userBlockedId),
      getIds,
    )(account.usersBlocked);
    const user = { usersLiked, usersBlocked };
    const { data: myUser } = await patchUser(account.token, user);
    dispatch({ type: BLOCKED_USER, myUser });
    socket.emit('userBlocked', {
      user: pick(['_id', 'username'])(myUser),
      userBlockedId,
    });
    const friendsIds = getIds(account.friends);
    const isUnfriended = find(friendId => userBlockedId === friendId)(friendsIds);
    if (isUnfriended)
      socket.emit('userUnfriended', { user: pick(['_id', 'username'])(myUser), userBlockedId });
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const uploadImage = (token, image) => async dispatch => {
  try {
    dispatch({ type: UPLOAD_IMAGE });
    const { data: myUser } = await postUserImage(token, image);
    dispatch({ type: UPLOADED_IMAGE, myUser });
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const removeImage = (token, imageId) => async dispatch => {
  try {
    dispatch({ type: DELETE_IMAGE });
    const { data: myUser } = await deleteUserImage(token, imageId);
    dispatch({ type: DELETED_IMAGE, myUser });
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const removeNotification = _id => ({ type: REMOVE_NOTIFICATION, _id });
