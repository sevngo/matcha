import { reject, compose, append, equals, pick } from 'ramda';
import { enqueueNotification, success, error } from './app';
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

export const logout = () => ({ type: LOGOUT });

export const register = user => async dispatch => {
  try {
    dispatch({ type: REGISTER });
    await postUsers(user);
    dispatch(enqueueNotification(success('Email sent !')));
  } catch {
    dispatch(enqueueNotification(error));
  }
};

export const login = user => async dispatch => {
  try {
    dispatch({ type: LOGIN });
    const { data } = await postUsersLogin(user);
    dispatch({ type: LOGGED, data });
  } catch {
    dispatch(enqueueNotification(error));
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
      'token',
    ])(account);
    const { data } = await patchUser(account.token, user);
    dispatch({ type: UPDATED_USER, data });
  } catch {
    dispatch(enqueueNotification(error));
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
    dispatch(enqueueNotification(error));
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
    dispatch(enqueueNotification(error));
  }
};

export const forgotPassword = user => async dispatch => {
  try {
    dispatch({ type: FORGOT_PASSWORD });
    await postUsersForgot(user);
    dispatch(enqueueNotification(success('Email sent !')));
  } catch {
    dispatch(enqueueNotification(error));
  }
};
