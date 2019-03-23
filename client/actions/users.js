import { enqueueSnackbar, error } from './app';
import { getUsers, getUser } from '../api';

export const USERS_LOAD = 'USERS_LOAD';
export const USERS_LOADED = 'USERS_LOADED';
export const USER_LOAD = 'USER_LOAD';
export const USER_LOADED = 'USER_LOADED';
export const HANDLE_FILTER = 'HANDLE_FILTER';

export const handleFilter = filter => ({ type: HANDLE_FILTER, filter });

export const loadUsers = () => async (dispatch, getState) => {
  try {
    const {
      auth: { token },
    } = getState();
    dispatch({ type: USERS_LOAD });
    const { data } = await getUsers(token);
    dispatch({ type: USERS_LOADED, data });
  } catch {
    dispatch(enqueueSnackbar(error));
  }
};

export const loadUser = id => async (dispatch, getState) => {
  try {
    const {
      auth: { token },
    } = getState();
    dispatch({ type: USER_LOAD });
    const { data } = await getUser(token, id);
    dispatch({ type: USER_LOADED, data });
  } catch (e) {
    dispatch(enqueueSnackbar(error));
  }
};
