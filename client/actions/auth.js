import { reject, compose, append, equals, pick } from 'ramda';
import { enqueueSnackbar, success, error } from './app';
import { postUsers, postUsersLogin, patchUser, postUsersForgot } from '../api';
import { getIds } from '../utils';
import { socket } from '../index';

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

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
  socket.emit('logout');
};

export const register = user => async dispatch => {
  try {
    dispatch({ type: REGISTER });
    await postUsers(user);
    dispatch(enqueueSnackbar(success('Email sent !')));
  } catch {
    dispatch(enqueueSnackbar(error));
  }
};

export const login = user => async dispatch => {
  try {
    dispatch({ type: LOGIN });
    const { data } = await postUsersLogin(user);
    dispatch({ type: LOGGED, data });
    socket.emit('login', pick(['_id', 'username', 'friends'])(data));
  } catch {
    dispatch(enqueueSnackbar(error));
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
    const { data } = await patchUser(account.token, user);
    dispatch({ type: UPDATED_USER, data });
  } catch {
    dispatch(enqueueSnackbar(error));
  }
};

export const forgotPassword = user => async dispatch => {
  try {
    dispatch({ type: FORGOT_PASSWORD });
    await postUsersForgot(user);
    dispatch(enqueueSnackbar(success('Email sent !')));
  } catch {
    dispatch(enqueueSnackbar(error));
  }
};

export const likeUser = (account, userId) => async dispatch => {
  try {
    dispatch({ type: LIKE_USER });
    const usersLiked = compose(
      append(userId),
      getIds,
    )(account.usersLiked);
    const usersBlocked = compose(
      reject(equals(userId)),
      getIds,
    )(account.usersBlocked);
    const user = { usersLiked, usersBlocked };
    const { data } = await patchUser(account.token, user);
    dispatch({ type: LIKED_USER, data });
    socket.emit('likeUser', pick(['_id', 'username', 'friends'])(data));
  } catch {
    dispatch(enqueueSnackbar(error));
  }
};

export const blockUser = (account, userId) => async dispatch => {
  try {
    dispatch({ type: BLOCK_USER });
    const usersLiked = compose(
      reject(equals(userId)),
      getIds,
    )(account.usersLiked);
    const usersBlocked = compose(
      append(userId),
      getIds,
    )(account.usersBlocked);
    const user = { usersLiked, usersBlocked };
    const { data } = await patchUser(account.token, user);
    dispatch({ type: BLOCKED_USER, data });
  } catch {
    dispatch(enqueueSnackbar(error));
  }
};
