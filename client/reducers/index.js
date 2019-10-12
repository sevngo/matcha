import { combineReducers } from 'redux';
import myUser from './myUser';
import users from './users';
import app from './app';
import snackbar from './snackbar';

export default combineReducers({
  myUser,
  users,
  app,
  snackbar,
});
