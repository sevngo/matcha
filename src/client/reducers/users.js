import { LOADED_USERS, HANDLE_FILTER } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case LOADED_USERS:
      return { ...state, ...action.data };
    case HANDLE_FILTER:
      return { ...state, filter: { ...state.filter, ...action.filter } };
    default:
      return state;
  }
};
