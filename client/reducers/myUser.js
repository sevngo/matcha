import {
  LOGGED,
  LOGOUT,
  UPDATED_USER,
  UPLOADED_IMAGE,
  DELETED_IMAGE,
  BLOCKED_USER,
  LIKED_USER,
  GOT_FRIENDED,
  GOT_UNDFRIENDED,
  ADD_NOTIFICATION,
} from '../actions';
import { reject } from 'ramda';

const initialState = { notifications: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGED:
      return { ...state, ...action.myUser };
    case LOGOUT:
      return initialState;
    case UPDATED_USER:
      return { ...state, ...action.myUser };
    case UPLOADED_IMAGE:
      return { ...state, ...action.myUser };
    case DELETED_IMAGE:
      return { ...state, ...action.myUser };
    case BLOCKED_USER:
      return { ...state, ...action.myUser };
    case LIKED_USER:
      return { ...state, ...action.myUser };
    case GOT_FRIENDED:
      return { ...state, friends: [...state.friends, { ...action.user }] };
    case GOT_UNDFRIENDED:
      return { ...state, friends: reject(friend => friend._id === action._id)(state.friends) };
    case ADD_NOTIFICATION:
      return { ...state, notifications: [action.notification, ...state.notifications] };
    default:
      return state;
  }
};
