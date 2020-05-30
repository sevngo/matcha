import { DISPLAY_LOADER, HIDE_LOADER } from '../actions';

export default (state = false, action) => {
  switch (action.type) {
    case DISPLAY_LOADER:
      return true;
    case HIDE_LOADER:
      return false;
    default:
      return state;
  }
};
