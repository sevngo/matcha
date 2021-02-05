import {
  LOGGED,
  LOGOUT,
  UPDATED_USER,
  UPLOADED_IMAGE,
  BLOCKED_USER,
  LIKED_USER,
  GOT_FRIENDED,
  GOT_UNDFRIENDED,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '../actions/auth';
import { reject } from 'ramda';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOGGED:
      return { ...state, ...action.data };
    case LOGOUT:
      return {};
    case UPDATED_USER:
      return { ...state, ...action.data };
    case UPLOADED_IMAGE:
      return { ...state, ...action.data };
    case BLOCKED_USER:
      return { ...state, ...action.data };
    case LIKED_USER:
      return { ...state, ...action.data };
    case GOT_FRIENDED:
      return { ...state, friends: [...state.friends, { ...action.user }] };
    case GOT_UNDFRIENDED:
      return {
        ...state,
        friends: reject((friend) => friend._id === action._id)(state.friends),
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.notification, ...(state.notifications || [])],
      };
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: reject(
          (notification) => notification._id === action._id
        )(state.notifications),
      };
    default:
      return state;
  }
};

export default reducer;
