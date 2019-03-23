import { USERS_LOADED, HANDLE_FILTER, USER_LOADED } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case USERS_LOADED:
      return { ...state, data: action.data };
    case USER_LOADED:
      return { ...state, user: action.data };
    case HANDLE_FILTER:
      return { ...state, filter: action.filter };
    default:
      return state;
  }
};
