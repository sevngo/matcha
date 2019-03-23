import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import auth from './reducers/auth';
import users from './reducers/users';
import app from './reducers/app';
import * as constants from './utils/constants';

const reducer = combineReducers({
  auth,
  users,
  app,
});

const initialState = {
  // auth: {
  //   token:
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzhkNDBhYWQwYTRkODFlMDJmM2RkNWYiLCJpYXQiOjE1NTI4MzY3MDN9.dWaAzT-ULKY4SDmoIFkFtsv9uAgbQEr2es1cvBZtBKE',
  // },
  app: { snackbars: [] },
  users: { data: [], filter: constants.filter },
};

export default createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
