import { reduce } from 'ramda';
import { openSnackbar } from './';
import { getUsers, getUser } from '../api';
import { ERROR } from '../containers/Snackbar/constants';
import { socket } from '../index';

export const LOAD_USERS = 'LOAD_USERS';
export const LOADED_USERS = 'LOADED_USERS';
export const LOAD_USER = 'LOAD_USER';
export const LOADED_USER = 'LOADED_USER';
export const HANDLE_FILTER = 'HANDLE_FILTER';

export const handleFilter = filter => ({ type: HANDLE_FILTER, filter });

export const loadUsers = (token, filter) => async dispatch => {
  try {
    const { gender, interests, ageRange, sortBy, maxDistance, limit, skip } = filter;

    const genderQuery = `gender=${gender}`;

    const interestsQuery = reduce((acc, interest) => `${acc}&interests=${interest}`, '')(interests);

    const sortQuery = `&sortBy=${sortBy}`;

    const maxDistanceQuery = `&maxDistance=${maxDistance}000`;

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonthDay = `-${today.getMonth() + 1}-${today.getDate()}`;
    const birthMin = `${todayYear - ageRange[1] - 1}${todayMonthDay}`;
    const birthMax = `${todayYear - ageRange[0]}${todayMonthDay}`;
    const birthQuery = `&birthRange=${birthMin}:${birthMax}`;

    const limitQuery = `&limit=${limit}`;
    const skipQuery = `&skip=${skip}`;

    const query = `?${genderQuery}${birthQuery}${sortQuery}${interestsQuery}${maxDistanceQuery}${limitQuery}${skipQuery}`;
    dispatch({ type: LOAD_USERS });
    const { data } = await getUsers(token, query);
    dispatch({ type: LOADED_USERS, data });
  } catch {
    dispatch(openSnackbar({ variant: ERROR }));
  }
};

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
