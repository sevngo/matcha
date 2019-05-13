import {
  LOGGED,
  LOGOUT,
  UPDATED_USER,
  UPLOADED_IMAGE,
  DELETED_IMAGE,
  DISLIKED_USER,
  LIKED_USER,
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
    case DISLIKED_USER:
      return { ...state, ...action.data };
    case LIKED_USER:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
