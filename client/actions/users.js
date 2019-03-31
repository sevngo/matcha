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

export const loadUsers = token => async dispatch => {
  try {
    dispatch({ type: USERS_LOAD });
    const { data } = await getUsers(token);
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
