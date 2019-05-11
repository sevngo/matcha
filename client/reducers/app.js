import { filter } from 'ramda';
import {
  ENQUEUE_SNACKBAR,
  REMOVE_SNACKBAR,
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
  UNBLOCK_USER,
  BLOCKED_USER,
  UNBLOCKED_USER,
  FORGOT_PASSWORD,
} from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return {
        ...state,
        isLoading: false,
        snackbars: [
          ...state.snackbars,
          {
            ...action.snackbar,
          },
        ],
      };
    case REMOVE_SNACKBAR:
      return {
        ...state,
        snackbars: filter(snackbar => snackbar.key !== action.key)(state.snackbars),
      };
    case LOGIN:
    case UPDATE_USER:
    case LOAD_USERS:
    case LOAD_LOAD:
    case UPLOAD_IMAGE:
    case DELETE_IMAGE:
    case BLOCK_USER:
    case UNBLOCK_USER:
    case FORGOT_PASSWORD:
      return { ...state, isLoading: true };
    case LOGGED:
    case UPDATED_USER:
    case LOADED_USERS:
    case LOADED_USER:
    case UPLOADED_IMAGE:
    case DELETED_IMAGE:
    case BLOCKED_USER:
    case UNBLOCKED_USER:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
