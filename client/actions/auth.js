import { omit, reject } from 'ramda';
import { enqueueNotification, success, error } from './app';
import { postUsers, postUsersLogin, patchUser } from '../api';

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

export const toOmit = omit(['_id', 'token', 'images', 'usersBlocked']);

export const logout = () => ({ type: LOGOUT });

export const register = user => async dispatch => {
  try {
    dispatch({ type: REGISTER });
    await postUsers(user);
    dispatch(enqueueNotification(success('Email sent')));
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
    const { data } = await patchUser(account.token, account._id, toOmit(account));
    dispatch({ type: UPDATED_USER, data });
  } catch (e) {
    dispatch(enqueueNotification(error));
  }
};

export const blockUser = (account, userId) => async dispatch => {
  try {
    dispatch({ type: BLOCK_USER });
    const myAccount = { ...account, usersBlockedIds: [...account.usersBlockedIds, userId] };
    const user = toOmit(myAccount);
    const { data } = await patchUser(account.token, account._id, user);
    dispatch({ type: BLOCKED_USER, data });
  } catch (e) {
    dispatch(enqueueNotification(error));
  }
};

export const unblockUser = (account, userId) => async dispatch => {
  try {
    dispatch({ type: UNBLOCK_USER });
    const myAccount = {
      ...account,
      usersBlockedIds: reject(user => userId === user)(account.usersBlockedIds),
    };
    const user = toOmit(myAccount);
    const { data } = await patchUser(account.token, account._id, user);
    dispatch({ type: UNBLOCKED_USER, data });
  } catch (e) {
    dispatch(enqueueNotification(error));
  }
};
