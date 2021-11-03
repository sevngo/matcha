import { DISPLAY_LOADER, HIDE_LOADER } from './actions';

const reducer = (state = false, action) => {
  switch (action.type) {
    case DISPLAY_LOADER:
      return true;
    case HIDE_LOADER:
      return false;
    default:
      return state;
  }
};

export default reducer;
