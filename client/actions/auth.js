import { omit } from 'ramda';
import { enqueueNotification, success, error } from './app';
import { createUser, loginUser, patchUser } from '../api';

export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';
export const LOGGED = 'LOGGED';
export const LOGOUT = 'LOGOUT';
export const USER_UPDATE = 'USER_UPDATE';
export const USER_UPDATED = 'USER_UPDATED';
export const BLOCK_USER = 'BLOCK_USER';
export const UNBLOCK_USER = 'UNBLOCK_USER';

export const logout = () => ({ type: LOGOUT });

export const register = user => async dispatch => {
  try {
    dispatch({ type: REGISTER });
    await createUser(user);
    dispatch(enqueueNotification(success('Email sent')));
  } catch {
    dispatch(enqueueNotification(error));
  }
};

export const login = user => async dispatch => {
  try {
    dispatch({ type: LOGIN });
    const { data } = await loginUser(user);
    dispatch({ type: LOGGED, data });
  } catch {
    dispatch(enqueueNotification(error));
  }
};

export const updateAccount = account => async dispatch => {
  try {
    dispatch({ type: USER_UPDATE });
    const { data } = await patchUser(
      account.token,
      account._id,
      omit(['_id', 'token', 'images'])(account),
    );
    dispatch({ type: USER_UPDATED, data });
  } catch (e) {
    dispatch(enqueueNotification(error));
  }
};

export const blockUser = userId => ({ type: BLOCK_USER, userId });

export const unblockUser = userId => ({ type: UNBLOCK_USER, userId });
