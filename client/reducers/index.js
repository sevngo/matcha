import { combineReducers } from 'redux';
import myUser from './myUser';
import users from './users';
import user from './user';
import app from './app';
import snackbar from './snackbar';

export default combineReducers({
  myUser,
  users,
  user,
  app,
  snackbar,
});
