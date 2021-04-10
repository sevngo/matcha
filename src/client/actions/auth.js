import { append, compose, equals, find, pick, reject } from 'ramda';
import {
  patchUser,
  postUser,
  postUserForgot,
  postUserImage,
  postUserLogin,
} from '../api';
import { SUCCESS } from '../containers/Snackbar/constants';
import {
  getAuthFriends,
  getAuthId,
  getAuthUsersBlocked,
  getAuthUsersLiked,
} from '../selectors/auth';
import socket from '../socketEvents';
import { getIds } from '../utils';
import { openSnackbar } from './snackbar';

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
export const GOT_FRIENDED = 'GOT_FRIENDED';
export const GOT_UNDFRIENDED = 'GOT_UNDFRIENDED';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const logout = () => (dispatch, getState) => {
  const state = getState();
  const authId = getAuthId(state);
  dispatch({ type: LOGOUT });
  socket.emit('logout', authId);
};

export const register = (user) => async (dispatch) => {
  dispatch({ type: REGISTER });
  await postUser(user);
  dispatch(openSnackbar({ variant: SUCCESS }));
};

export const login = (user) => async (dispatch) => {
  dispatch({ type: LOGIN });
  const { data } = await postUserLogin(user);
  dispatch({ type: LOGGED, data });
  socket.emit('logged', data._id);
};

export const updateUser = (user, token) => async (dispatch) => {
  dispatch({ type: UPDATE_USER });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await patchUser(user, config);
  dispatch({ type: UPDATED_USER, data });
};

export const forgotPassword = (auth) => async (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD });
  await postUserForgot(auth);
  dispatch(openSnackbar({ variant: SUCCESS }));
};

export const likeUser = (userLikedId) => async (dispatch, getState) => {
  dispatch({ type: LIKE_USER });
  const state = getState();
  const authUsersLiked = getAuthUsersLiked(state);
  const authUsersBlocked = getAuthUsersBlocked(state);
  const usersLiked = compose(append(userLikedId), getIds)(authUsersLiked);
  const usersBlocked = compose(
    reject(equals(userLikedId)),
    getIds
  )(authUsersBlocked);
  const { data } = await patchUser({ usersLiked, usersBlocked });
  dispatch({ type: LIKED_USER, data });
  const sender = pick(['_id', 'username'])(data);
  socket.emit('userLiked', sender, userLikedId);
  const friendsIds = getIds(data.friends);
  const isFriended = find((friendId) => userLikedId === friendId)(friendsIds);
  if (isFriended) {
    const sender = pick(['_id', 'username'])(data);
    socket.emit('userFriended', sender, userLikedId);
  }
};

export const blockUser = (userBlockedId) => async (dispatch, getState) => {
  dispatch({ type: BLOCK_USER });
  const state = getState();
  const authUsersLiked = getAuthUsersLiked(state);
  const authUsersBlocked = getAuthUsersBlocked(state);
  const friends = getAuthFriends(state);
  const usersLiked = compose(
    reject(equals(userBlockedId)),
    getIds
  )(authUsersLiked);
  const usersBlocked = compose(append(userBlockedId), getIds)(authUsersBlocked);
  const user = { usersLiked, usersBlocked };
  const { data } = await patchUser(user);
  dispatch({ type: BLOCKED_USER, data });
  const sender = pick(['_id', 'username'])(data);
  socket.emit('userBlocked', sender, userBlockedId);
  const friendsIds = getIds(friends);
  const isUnfriended = find((friendId) => userBlockedId === friendId)(
    friendsIds
  );
  if (isUnfriended) {
    const sender = pick(['_id', 'username'])(data);
    socket.emit('userUnfriended', sender, userBlockedId);
  }
};

export const uploadImage = (id, image) => async (dispatch) => {
  dispatch({ type: UPLOAD_IMAGE });
  const { data } = await postUserImage(id, image);
  dispatch({ type: UPLOADED_IMAGE, data });
};

export const removeNotification = (_id) => ({ type: REMOVE_NOTIFICATION, _id });
