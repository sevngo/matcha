import { getUsers } from '../api';
import { getUsersFilter } from '../selectors/users';

export const LOAD_USERS = 'LOAD_USERS';
export const LOADED_USERS = 'LOADED_USERS';
export const HANDLE_FILTER = 'HANDLE_FILTER';

export const handleFilter = (filter) => ({ type: HANDLE_FILTER, filter });

export const loadUsers = () => async (dispatch, getState) => {
  dispatch({ type: LOAD_USERS });
  const state = getState();
  const filter = getUsersFilter(state);
  const { gender, ageRange, sortBy, maxDistance, limit, skip } = filter;

  const genderQuery = `gender=${gender}`;

  const sortQuery = `sortBy=${sortBy}`;

  const maxDistanceQuery = `maxDistance=${maxDistance}000`;

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonthDay = `-${today.getMonth() + 1}-${today.getDate()}`;
  const birthMin = `${todayYear - ageRange[1] - 1}${todayMonthDay}`;
  const birthMax = `${todayYear - ageRange[0]}${todayMonthDay}`;
  const birthQuery = `birthRange=${birthMin}:${birthMax}`;

  const limitQuery = `limit=${limit}`;
  const skipQuery = `skip=${skip}`;

  const query = `?${genderQuery}&${birthQuery}&${sortQuery}&${maxDistanceQuery}&${limitQuery}&${skipQuery}`;

  const { data, headers } = await getUsers(query);
  const total = Number(headers['x-total-count']);
  const users = { data, total };
  dispatch({ type: LOADED_USERS, users });
};
