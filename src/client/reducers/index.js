import { combineReducers } from 'redux';
import auth from './auth';
import users from './users';
import user from './user';
import loading from './loading';
import snackbar from './snackbar';

export default combineReducers({
  auth,
  users,
  user,
  loading,
  snackbar,
});
