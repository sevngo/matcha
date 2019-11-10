import { openSnackbar } from './';
import { getUser } from '../api';
import { ERROR } from '../containers/Snackbar/constants';
import { socket } from '../index';

export const LOAD_USER = 'LOAD_USER';
export const LOADED_USER = 'LOADED_USER';

export const loadUser = (myUser, id) => async dispatch => {
  const { token, _id, username } = myUser;
  try {
    dispatch({ type: LOAD_USER });
    const { data } = await getUser(token, id);
    dispatch({ type: LOADED_USER, data });
    socket.emit('userVisited', {
      user: { _id, username },
      userVisitedId: id,
    });
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};
