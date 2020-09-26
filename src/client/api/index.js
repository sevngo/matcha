import axios from 'axios';
import { path, mergeDeepRight } from 'ramda';
import { getToken } from '../selectors';
import { logout, openSnackbar, displayLoader, hideLoader } from '../actions';
import { ERROR } from '../containers/Snackbar/constants';
import store from '../store';

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
    const message = path(['response', 'data', 'message'])(error);
    if (status === 401) store.dispatch(logout());
    else store.dispatch(openSnackbar({ variant: ERROR, message }));
    return Promise.reject(error);
  }
);

export * from './users';
