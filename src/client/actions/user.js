import { getUser } from '../api';

export const LOAD_USER = 'LOAD_USER';
export const LOADED_USER = 'LOADED_USER';

export const loadUser = (id) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const { data } = await getUser(id);
    dispatch({ type: LOADED_USER, data });
  } catch {}
};
