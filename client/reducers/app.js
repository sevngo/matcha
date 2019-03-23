import { filter } from 'ramda';
import {
  ENQUEUE_SNACKBAR,
  REMOVE_SNACKBAR,
  LOGIN,
  LOGGED,
  USER_UPDATE,
  USER_UPDATED,
  USERS_LOAD,
  USERS_LOADED,
  USER_LOAD,
  USER_LOADED,
} from '../actions';

const defaultState = {
  snackbars: [],
};

export default (state = defaultState, action) => {
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
    case USER_UPDATE:
    case USERS_LOAD:
    case USER_LOAD:
      return { ...state, isLoading: true };
    case LOGGED:
    case USER_UPDATED:
    case USERS_LOADED:
    case USER_LOADED:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
