import {
  LOGGED,
  LOGOUT,
  UPDATED_USER,
  UPLOADED_IMAGE,
  DELETED_IMAGE,
  BLOCKED_USER,
  UNBLOCKED_USER,
} from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGGED:
      return action.data;
    case LOGOUT:
      return {};
    case UPDATED_USER:
      return { ...state, ...action.data };
    case UPLOADED_IMAGE:
      return { ...state, ...action.data };
    case DELETED_IMAGE:
      return { ...state, ...action.data };
    case BLOCKED_USER:
      return { ...state, ...action.data };
    case UNBLOCKED_USER:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
