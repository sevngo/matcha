import { combineReducers } from 'redux';
import auth from './auth';
import users from './users';
import app from './app';

export default combineReducers({
  auth,
  users,
  app,
});
