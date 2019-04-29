import {
  LOGGED,
  LOGOUT,
  USER_UPDATED,
  IMAGE_UPLOADED,
  IMAGE_DELETED,
  BLOCK_USER,
  UNBLOCK_USER,
} from '../actions';
import { reject } from 'ramda';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGGED:
      return action.data;
    case LOGOUT:
      return {};
    case USER_UPDATED:
      return { ...state, ...action.data };
    case IMAGE_UPLOADED:
      return { ...state, ...action.data };
    case IMAGE_DELETED:
      return { ...state, ...action.data };
    case BLOCK_USER:
      return { ...state, usersBlocked: [...state.usersBlocked, action.userId] };
    case UNBLOCK_USER:
      return { ...state, usersBlocked: reject(user => action.userId === user)(state.usersBlocked) };
    default:
      return state;
  }
};
