import { reduce } from 'ramda';
import { enqueueNotification, error } from './app';
import { getUsers, getUser, postUsersImages, deleteUsersImages } from '../api';

export const LOAD_USERS = 'LOAD_USERS';
export const LOADED_USERS = 'LOADED_USERS';
export const LOAD_LOAD = 'LOAD_LOAD';
export const LOADED_USER = 'LOADED_USER';
export const HANDLE_FILTER = 'HANDLE_FILTER';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const UPLOADED_IMAGE = 'UPLOADED_IMAGE';
export const DELETE_IMAGE = 'DELETE_IMAGE';
export const DELETED_IMAGE = 'DELETED_IMAGE';

export const handleFilter = filter => ({ type: HANDLE_FILTER, filter });

export const loadUsers = (token, filter) => async dispatch => {
  try {
    const { gender, interests, ageRange, sortBy, maxDistance } = filter;

    const genderQuery = `?gender=${gender}`;

    const interestsQuery = reduce((acc, interest) => `${acc}&interests=${interest}`, '')(interests);

    const sortQuery = `&sortBy=${sortBy}`;

    const maxDistanceQuery = `&maxDistance=${maxDistance}000`;

    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonthDay = `-${today.getMonth() + 1}-${today.getDate()}`;
    const birthMin = `${todayYear - ageRange[1] - 1}${todayMonthDay}`;
    const birthMax = `${todayYear - ageRange[0]}${todayMonthDay}`;
    const birthQuery = `&birthRange=${birthMin}:${birthMax}`;

    const query = `${genderQuery}${birthQuery}${sortQuery}${interestsQuery}${maxDistanceQuery}`;
    dispatch({ type: LOAD_USERS });
    const { data } = await getUsers(token, query);
    dispatch({ type: LOADED_USERS, data });
  } catch {
    dispatch(enqueueNotification(error));
  }
};

export const loadUser = (token, id) => async dispatch => {
  try {
    dispatch({ type: LOAD_LOAD });
    const { data } = await getUser(token, id);
    dispatch({ type: LOADED_USER, data });
  } catch {
    dispatch(enqueueNotification(error));
  }
};

export const uploadImage = (token, id, image) => async dispatch => {
  try {
    dispatch({ type: UPLOAD_IMAGE });
    const { data } = await postUsersImages(token, id, image);
    dispatch({ type: UPLOADED_IMAGE, data });
  } catch {
    dispatch(enqueueNotification(error));
  }
};

export const removeImage = (token, id, imageId) => async dispatch => {
  try {
    dispatch({ type: DELETE_IMAGE });
    const { data } = await deleteUsersImages(token, id, imageId);
    dispatch({ type: DELETED_IMAGE, data });
  } catch {
    dispatch(enqueueNotification(error));
  }
};
