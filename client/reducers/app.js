import {
  LOGIN,
  LOGGED,
  UPDATE_USER,
  UPDATED_USER,
  LOAD_USERS,
  LOADED_USERS,
  LOAD_LOAD,
  LOADED_USER,
  UPLOAD_IMAGE,
  UPLOADED_IMAGE,
  DELETE_IMAGE,
  DELETED_IMAGE,
  BLOCK_USER,
  BLOCKED_USER,
  LIKE_USER,
  LIKED_USER,
  FORGOT_PASSWORD,
  OPEN_SNACKBAR,
} from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
    case UPDATE_USER:
    case LOAD_USERS:
    case LOAD_LOAD:
    case UPLOAD_IMAGE:
    case DELETE_IMAGE:
    case LIKE_USER:
    case BLOCK_USER:
    case FORGOT_PASSWORD:
      return { ...state, isLoading: true };
    case LOGGED:
    case UPDATED_USER:
    case LOADED_USERS:
    case LOADED_USER:
    case UPLOADED_IMAGE:
    case DELETED_IMAGE:
    case LIKED_USER:
    case BLOCKED_USER:
    case OPEN_SNACKBAR:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
