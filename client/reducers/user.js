import { LOADED_USER } from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case LOADED_USER:
      return action.data;
    default:
      return state;
  }
};
