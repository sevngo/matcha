import axios from 'axios';
import { mergeDeepRight } from 'ramda';
import { getAuthToken } from '../selectors/auth';
import { displayLoader, hideLoader } from '../actions/loading';
import { logout } from '../actions/auth';
import { openSnackbar } from '../actions/snackbar';
import { ERROR } from '../containers/Snackbar/constants';
import store from '../store';

axios.interceptors.request.use(
  (config) => {
    store.dispatch(displayLoader());
    const state = store.getState();
    const token = getAuthToken(state);
    if (!token) return config;
    const auth = { headers: { Authorization: `Bearer ${token}` } };
    const newConfig = mergeDeepRight(config, auth);
    return newConfig;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    store.dispatch(hideLoader());
    return response;
  },
  (error) => {
    store.dispatch(hideLoader());
    const status = error.response?.status;
    const message = error.response?.data?.message;
    if (status === 401) store.dispatch(logout());
    else store.dispatch(openSnackbar({ variant: ERROR, message }));
    return Promise.reject(error);
  }
);

export * from './users';
