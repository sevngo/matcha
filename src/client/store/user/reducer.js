import { LOADED_USER } from './actions';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case LOADED_USER:
      return action.data;
    default:
      return state;
  }
};

export default reducer;
