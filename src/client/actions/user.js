import { openSnackbar } from '.';
import { getUser } from '../api';
import { getToken } from '../selectors';
import { ERROR } from '../containers/Snackbar/constants';

export const LOAD_USER = 'LOAD_USER';
export const LOADED_USER = 'LOADED_USER';

export const loadUser = id => async (dispatch, getState) => {
  try {
    dispatch({ type: LOAD_USER });
    const state = getState();
    const token = getToken(state);
    const { data } = await getUser(token, id);
    dispatch({ type: LOADED_USER, data });
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};
