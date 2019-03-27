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
  //   _id: '5c93ea0c325c2c05da2f720e',
  //   token:
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzkzZWEzZDMyNWMyYzA1ZGEyZjcyMTEiLCJpYXQiOjE1NTM3MDk2OTZ9.OeHT16WwlAmhMfG9DtyVIODsKwvpu_FS9aiS8jCcKtk',
  // },
  app: { snackbars: [] },
  users: { data: [], filter: constants.filter },
};

export default createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
