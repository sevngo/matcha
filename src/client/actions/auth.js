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
import socket from '../socketEvents';
import { SUCCESS, ERROR } from '../containers/Snackbar/constants';
import {
  getUsersLiked,
  getUsersBlocked,
  getToken,
  getFriends,
} from '../selectors';

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

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  socket.emit('logout');
};

export const register = (user) => async (dispatch) => {
  dispatch({ type: REGISTER });
  try {
    await postUser(user);
    dispatch(openSnackbar({ variant: SUCCESS }));
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const login = (user) => async (dispatch) => {
  dispatch({ type: LOGIN });
  try {
    const { data } = await postUserLogin(user);
    dispatch({ type: LOGGED, data });
    socket.emit('logged', pick(['_id', 'username', 'friends'])(data));
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const updateUser = (token, auth) => async (dispatch) => {
  dispatch({ type: UPDATE_USER });
  try {
    const { data } = await patchUser(token, auth);
    dispatch({ type: UPDATED_USER, data });
    dispatch(openSnackbar({ variant: SUCCESS }));
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const forgotPassword = (auth) => async (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD });
  try {
    await postUserForgot(auth);
    dispatch(openSnackbar({ variant: SUCCESS }));
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const likeUser = (userLikedId) => async (dispatch, getState) => {
  dispatch({ type: LIKE_USER });
  const state = getState();
  const authUsersLiked = getUsersLiked(state);
  const authUsersBlocked = getUsersBlocked(state);
  const token = getToken(state);
  const usersLiked = compose(append(userLikedId), getIds)(authUsersLiked);
  const usersBlocked = compose(
    reject(equals(userLikedId)),
    getIds
  )(authUsersBlocked);
  try {
    const { data } = await patchUser(token, { usersLiked, usersBlocked });
    dispatch({ type: LIKED_USER, data });
    socket.emit('userLiked', {
      user: pick(['_id', 'username'])(data),
      userLikedId,
    });
    const friendsIds = getIds(data.friends);
    const isFriended = find((friendId) => userLikedId === friendId)(friendsIds);
    if (isFriended)
      socket.emit('userFriended', {
        user: pick(['_id', 'username'])(data),
        userLikedId,
      });
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const blockUser = (userBlockedId) => async (dispatch, getState) => {
  dispatch({ type: BLOCK_USER });
  const state = getState();
  const authUsersLiked = getUsersLiked(state);
  const authUsersBlocked = getUsersBlocked(state);
  const friends = getFriends(state);
  const token = getToken(state);
  const usersLiked = compose(
    reject(equals(userBlockedId)),
    getIds
  )(authUsersLiked);
  const usersBlocked = compose(append(userBlockedId), getIds)(authUsersBlocked);
  const user = { usersLiked, usersBlocked };
  try {
    const { data } = await patchUser(token, user);
    dispatch({ type: BLOCKED_USER, data });
    socket.emit('userBlocked', {
      user: pick(['_id', 'username'])(data),
      userBlockedId,
    });
    const friendsIds = getIds(friends);
    const isUnfriended = find((friendId) => userBlockedId === friendId)(
      friendsIds
    );
    if (isUnfriended)
      socket.emit('userUnfriended', {
        user: pick(['_id', 'username'])(data),
        userBlockedId,
      });
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const uploadImage = (image) => async (dispatch, getState) => {
  dispatch({ type: UPLOAD_IMAGE });
  const state = getState();
  const token = getToken(state);
  try {
    const { data } = await postUserImage(token, image);
    dispatch({ type: UPLOADED_IMAGE, data });
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const removeImage = (imageId) => async (dispatch, getState) => {
  dispatch({ type: DELETE_IMAGE });
  const state = getState();
  const token = getToken(state);
  try {
    const { data } = await deleteUserImage(token, imageId);
    dispatch({ type: DELETED_IMAGE, data });
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

export const removeNotification = (_id) => ({ type: REMOVE_NOTIFICATION, _id });
