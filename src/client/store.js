import { createStore, applyMiddleware, compose } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { loadState, saveState } from './utils';
import { getAuth, getToken } from './selectors';
import { logout, openSnackbar, displayLoader, hideLoader } from './actions';
import { ERROR } from './containers/Snackbar/constants';
import { path, mergeDeepRight } from 'ramda';

export const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

const store = createStore(
  reducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

axios.interceptors.request.use(
  (config) => {
    store.dispatch(displayLoader());
    // const state = store.getState();
    // const token = getToken(state);
    // let auth;
    // if (token) auth = { headers: { Authorization: `Bearer ${token}` } };
    // const newConfig = mergeDeepRight(config, auth);
    // return newConfig;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    store.dispatch(hideLoader());
    return response;
  },
  (error) => {
    store.dispatch(hideLoader());
    const status = path(['response', 'status'])(error);
    const errorMessage = path(['response', 'data', 'errorMessage'])(error);
    if (status === 401) {
      store.dispatch(logout());
    }
    store.dispatch(openSnackbar({ variant: ERROR, message: errorMessage }));
    return Promise.reject(error);
  }
);

store.subscribe(() => {
  const state = store.getState();
  const auth = getAuth(state);
  saveState({ auth });
});

export default store;
