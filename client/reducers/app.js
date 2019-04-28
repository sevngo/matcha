import { filter } from 'ramda';
import {
  ENQUEUE_NOTIFICATION,
  REMOVE_NOTIFICATION,
  LOGIN,
  LOGGED,
  USER_UPDATE,
  USER_UPDATED,
  USERS_LOAD,
  USERS_LOADED,
  USER_LOAD,
  USER_LOADED,
  IMAGE_UPLOAD,
  IMAGE_UPLOADED,
  IMAGE_DELETE,
  IMAGE_DELETED,
} from '../actions';

const defaultState = {
  notifications: [],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ENQUEUE_NOTIFICATION:
      return {
        ...state,
        isLoading: false,
        notifications: [
          ...state.notifications,
          {
            ...action.notification,
          },
        ],
      };
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: filter(notification => notification.key !== action.key)(state.notifications),
      };
    case LOGIN:
    case USER_UPDATE:
    case USERS_LOAD:
    case USER_LOAD:
    case IMAGE_UPLOAD:
    case IMAGE_DELETE:
      return { ...state, isLoading: true };
    case LOGGED:
    case USER_UPDATED:
    case USERS_LOADED:
    case USER_LOADED:
    case IMAGE_UPLOADED:
    case IMAGE_DELETED:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
