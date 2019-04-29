import {
  LOGGED,
  LOGOUT,
  USER_UPDATED,
  IMAGE_UPLOADED,
  IMAGE_DELETED,
  BLOCKED_USER,
  UNBLOCKED_USER,
} from '../actions';

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
    case BLOCKED_USER:
      return { ...state, ...action.data };
    case UNBLOCKED_USER:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
