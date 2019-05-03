import { omit, reject, compose, append, equals } from 'ramda';
import { enqueueNotification, success, error } from './app';
import { postUsers, postUsersLogin, patchUser, postUsersForgot, postUsersReset } from '../api';
import { reduceIds } from '../utils';

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
export const RESET_PASSWORD = 'RESET_PASSWORD';

export const extract = omit(['_id', 'token', 'images']);

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
    const { data } = await patchUser(account.token, account._id, extract(account));
    dispatch({ type: UPDATED_USER, data });
  } catch (e) {
    dispatch(enqueueNotification(error));
  }
};

export const blockUser = (account, userId) => async dispatch => {
  try {
    dispatch({ type: BLOCK_USER });
    const usersBlocked = compose(
      append(userId),
      reduceIds,
    )(account.usersBlocked);
    const myAccount = { ...account, usersBlocked };
    const user = extract(myAccount);
    const { data } = await patchUser(account.token, account._id, user);
    dispatch({ type: BLOCKED_USER, data });
  } catch (e) {
    dispatch(enqueueNotification(error));
  }
};

export const unblockUser = (account, userId) => async dispatch => {
  try {
    dispatch({ type: UNBLOCK_USER });
    const usersBlocked = compose(
      reject(equals(userId)),
      reduceIds,
    )(account.usersBlocked);
    const myAccount = { ...account, usersBlocked };
    const user = extract(myAccount);
    const { data } = await patchUser(account.token, account._id, user);
    dispatch({ type: UNBLOCKED_USER, data });
  } catch (e) {
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

export const resetPassword = user => async dispatch => {
  try {
    dispatch({ type: RESET_PASSWORD });
    await postUsersReset(user);
    dispatch(enqueueNotification(success('Success !')));
  } catch {
    dispatch(enqueueNotification(error));
  }
};
