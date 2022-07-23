import { append, compose, equals, pick, reject } from 'ramda';
import {
  patchUser,
  postUser,
  postUserForgot,
  postUserImage,
  postUserLogin,
} from '../../api/users';
import { SUCCESS } from '../../containers/Snackbar/utils';
import { getAuthFriends, getAuthId, getAuthUsersLiked } from './selectors';
import socket from '../../socketIo';
import { createNotification, getIds } from '../../utils';
import { openSnackbar } from '../snackbar/actions';

export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGGED = 'LOGGED';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATED_USER = 'UPDATED_USER';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const LIKE_USER = 'LIKE_USER';
export const LIKED_USER = 'LIKED_USER';
export const DISLIKE_USER = 'DISLIKE_USER';
export const DISLIKED_USER = 'DISLIKED_USER';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const UPLOADED_IMAGE = 'UPLOADED_IMAGE';
export const GOT_FRIENDED = 'GOT_FRIENDED';
export const GOT_UNDFRIENDED = 'GOT_UNDFRIENDED';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';

export const logout = () => (dispatch, getState) => {
  const state = getState();
  const authId = getAuthId(state);
  dispatch({ type: LOGOUT });
  socket.emit('logout', authId);
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
    socket.emit('logged', data._id);
  } catch {}
};

export const updateUser = (user, token) => async (dispatch) => {
  dispatch({ type: UPDATE_USER });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await patchUser(user, config);
    dispatch({ type: UPDATED_USER, data });
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
  const usersLiked = compose(append(userLikedId), getIds)(authUsersLiked);
  try {
    const { data } = await patchUser({ usersLiked });
    dispatch({ type: LIKED_USER, data });
    const user = pick(['_id', 'username'])(data);
    const notification = createNotification({ user, event: 'gotLiked' });
    socket.emit('notification', notification, userLikedId);
    const friendsIds = getIds(data.friends);
    const isFriended = friendsIds.includes(userLikedId);
    if (isFriended) {
      const user = pick(['_id', 'username'])(data);
      const notification = createNotification({ user, event: 'gotFriended' });
      socket.emit('notification', notification, userLikedId);
    }
  } catch {}
};

export const dislikeUser = (userDislikedId) => async (dispatch, getState) => {
  dispatch({ type: DISLIKE_USER });
  const state = getState();
  const authUsersLiked = getAuthUsersLiked(state);
  const friends = getAuthFriends(state);
  const usersLiked = compose(
    reject(equals(userDislikedId)),
    getIds
  )(authUsersLiked);
  const user = { usersLiked };
  try {
    const { data } = await patchUser(user);
    dispatch({ type: DISLIKED_USER, data });
    const friendsIds = getIds(friends);
    const isUnfriended = friendsIds.includes(userDislikedId);
    if (isUnfriended) {
      const user = pick(['_id', 'username'])(data);
      const notification = createNotification({ user, event: 'gotUnfriended' });
      socket.emit('notification', notification, userDislikedId);
    }
  } catch {}
};

export const uploadImage = (id, image) => async (dispatch) => {
  dispatch({ type: UPLOAD_IMAGE });
  try {
    const { data } = await postUserImage(id, image);
    dispatch({ type: UPLOADED_IMAGE, data });
  } catch {}
};

export const deleteNotification = (id) => ({ type: DELETE_NOTIFICATION, id });
