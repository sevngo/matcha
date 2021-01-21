import { OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../actions';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return action.snackbar;
    case CLOSE_SNACKBAR:
      return {};
    default:
      return state;
  }
};

export default reducer;
