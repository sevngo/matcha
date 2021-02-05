import { reject, compose, append, equals, pick, find } from 'ramda';
import { openSnackbar } from './snackbar';
import {
  postUser,
  postUserLogin,
  patchUser,
  postUserForgot,
  postUserImage,
} from '../api';
import { getIds } from '../utils';
import socket from '../socketEvents';
import { SUCCESS } from '../containers/Snackbar/constants';
import {
  getAuthUsersLiked,
  getAuthUsersBlocked,
  getAuthFriends,
} from '../selectors/auth';

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

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  socket.emit('logout');
};

export const register = (user) => async (dispatch) => {
  dispatch({ type: REGISTER });
  try {
    await postUser(user);
    dispatch(openSnackbar({ variant: SUCCESS }));
  } catch {}
};

export const login = (user) => async (dispatch) => {
  dispatch({ type: LOGIN });
  try {
    const { data } = await postUserLogin(user);
    dispatch({ type: LOGGED, data });
    socket.emit('logged', pick(['_id', 'username', 'friends'])(data));
  } catch {}
};

export const updateUser = (auth, token) => async (dispatch) => {
  dispatch({ type: UPDATE_USER });
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await patchUser(auth, config);
    dispatch({ type: UPDATED_USER, data });
    dispatch(openSnackbar({ variant: SUCCESS }));
  } catch {}
};

export const forgotPassword = (auth) => async (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD });
  try {
    await postUserForgot(auth);
    dispatch(openSnackbar({ variant: SUCCESS }));
  } catch {}
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
  try {
    const { data } = await patchUser({ usersLiked, usersBlocked });
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
  } catch {}
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
  try {
    const { data } = await patchUser(user);
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
  } catch {}
};

export const uploadImage = (image) => async (dispatch) => {
  dispatch({ type: UPLOAD_IMAGE });
  try {
    const { data } = await postUserImage(image);
    dispatch({ type: UPLOADED_IMAGE, data });
  } catch {}
};

export const removeNotification = (_id) => ({ type: REMOVE_NOTIFICATION, _id });
