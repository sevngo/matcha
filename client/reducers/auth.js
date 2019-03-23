import { LOGGED, LOGOUT, HANDLE_FILTER, USER_UPDATED } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case LOGGED:
      return action.data;
    case LOGOUT:
      return {};
    case USER_UPDATED:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
