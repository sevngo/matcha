import { combineReducers } from 'redux';
import myUser from './myUser';
import users from './users';
import app from './app';

export default combineReducers({
  myUser,
  users,
  app,
});
