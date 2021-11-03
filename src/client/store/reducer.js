import { combineReducers } from 'redux';
import auth from './auth/reducer';
import users from './users/reducer';
import user from './user/reducer';
import loading from './loading/reducer';
import snackbar from './snackbar/reducer';

const reducer = combineReducers({
  auth,
  users,
  user,
  loading,
  snackbar,
});

export default reducer;
