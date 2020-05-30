import axios from 'axios';
import { path, mergeDeepRight } from 'ramda';
import { getToken, getAuth } from './selectors';
import { logout, openSnackbar, displayLoader, hideLoader } from './actions';
import { ERROR } from './containers/Snackbar/constants';
import { saveState } from './utils/localStorage';
import store from './store';

store.subscribe(() => {
  const state = store.getState();
  const auth = getAuth(state);
  saveState({ auth });
});

axios.interceptors.request.use(
  (config) => {
    store.dispatch(displayLoader());
    const state = store.getState();
    const token = getToken(state);
    if (!token) return config;
    const auth = { headers: { Authorization: `Bearer ${token}` } };
    const newConfig = mergeDeepRight(config, auth);
    return newConfig;
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
    if (status === 401) store.dispatch(logout());
    store.dispatch(openSnackbar({ variant: ERROR, message: errorMessage }));
    return Promise.reject(error);
  }
);
