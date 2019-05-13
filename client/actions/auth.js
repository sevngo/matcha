import { reject, compose, append, equals, pick } from 'ramda';
import { enqueueSnackbar, success, error } from './app';
import { postUsers, postUsersLogin, patchUser, postUsersForgot } from '../api';
import { getIds } from '../utils';

export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGGED = 'LOGGED';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATED_USER = 'UPDATED_USER';
export const BLOCK_USER = 'BLOCK_USER';
export const BLOCKED_USER = 'BLOCKED_USER';
export const UNBLOCK_USER = 'UNBLOCK_USER';
export const UNBLOCKED_USER = 'UNBLOCKED_USER';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const LIKE_USER = 'LIKE_USER';
export const LIKED_USER = 'LIKED_USER';
export const UNLIKE_USER = 'UNLIKE_USER';
export const UNLIKED_USER = 'UNLIKED_USER';

export const logout = () => ({ type: LOGOUT });

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

export const blockUser = (account, blockId) => async dispatch => {
  try {
    dispatch({ type: BLOCK_USER });
    const usersBlocked = compose(
      append(blockId),
      getIds,
    )(account.usersBlocked);
    const user = { usersBlocked };
    const { data } = await patchUser(account.token, user);
    dispatch({ type: BLOCKED_USER, data });
  } catch {
    dispatch(enqueueSnackbar(error));
  }
};

export const unblockUser = (account, userId) => async dispatch => {
  try {
    dispatch({ type: UNBLOCK_USER });
    const usersBlocked = compose(
      reject(equals(userId)),
      getIds,
    )(account.usersBlocked);
    const user = { usersBlocked };
    const { data } = await patchUser(account.token, user);
    dispatch({ type: UNBLOCKED_USER, data });
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
    const user = { usersLiked };
    const { data } = await patchUser(account.token, user);
    dispatch({ type: LIKED_USER, data });
  } catch {
    dispatch(enqueueSnackbar(error));
  }
};

export const unlikeUser = (account, userId) => async dispatch => {
  try {
    dispatch({ type: UNLIKE_USER });
    const usersLiked = compose(
      reject(equals(userId)),
      getIds,
    )(account.usersLiked);
    const user = { usersLiked };
    const { data } = await patchUser(account.token, user);
    dispatch({ type: UNLIKED_USER, data });
  } catch {
    dispatch(enqueueSnackbar(error));
  }
};
