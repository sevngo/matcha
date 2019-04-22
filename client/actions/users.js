import { reduce, path } from 'ramda';
import { enqueueSnackbar, error } from './app';
import { getUsers, getUser, uploadImage, deleteImage } from '../api';

export const USERS_LOAD = 'USERS_LOAD';
export const USERS_LOADED = 'USERS_LOADED';
export const USER_LOAD = 'USER_LOAD';
export const USER_LOADED = 'USER_LOADED';
export const HANDLE_FILTER = 'HANDLE_FILTER';
export const IMAGE_UPLOAD = 'IMAGE_UPLOAD';
export const IMAGE_UPLOADED = 'IMAGE_UPLOADED';
export const IMAGE_DELETE = 'IMAGE_DELETE';
export const IMAGE_DELETED = 'IMAGE_DELETED';

export const handleFilter = filter => ({ type: HANDLE_FILTER, filter });

export const loadUsers = (token, filter) => async (dispatch, getState) => {
  try {
    const { gender, interests, ageRange, sortBy, maxDistance } = filter;

    const coordinates = path(['auth', 'address', 'coordinates'])(getState());
    const coordinatesQuery = `&coordinates=${coordinates[0]}:${coordinates[1]}`;

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

    const query = `${genderQuery}${birthQuery}${sortQuery}${interestsQuery}${coordinatesQuery}${maxDistanceQuery}`;
    dispatch({ type: USERS_LOAD });
    const { data } = await getUsers(token, query);
    dispatch({ type: USERS_LOADED, data });
  } catch {
    dispatch(enqueueSnackbar(error));
  }
};

export const loadUser = (token, id) => async dispatch => {
  try {
    dispatch({ type: USER_LOAD });
    const { data } = await getUser(token, id);
    dispatch({ type: USER_LOADED, data });
  } catch {
    dispatch(enqueueSnackbar(error));
  }
};

export const addImage = (token, id, image) => async dispatch => {
  try {
    dispatch({ type: IMAGE_UPLOAD });
    const { data } = await uploadImage(token, id, image);
    dispatch({ type: IMAGE_UPLOADED, data });
  } catch {
    dispatch(enqueueSnackbar(error));
  }
};

export const removeImage = (token, id, imageId) => async dispatch => {
  try {
    dispatch({ type: IMAGE_DELETE });
    const { data } = await deleteImage(token, id, imageId);
    dispatch({ type: IMAGE_DELETED, data });
  } catch {
    dispatch(enqueueSnackbar(error));
  }
};
