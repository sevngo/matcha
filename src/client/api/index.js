import axios from 'axios';
import { mergeDeepRight } from 'ramda';
import { getAuthToken } from '../store/auth/selectors';
import { displayLoader, hideLoader } from '../store/loading/actions';
import { logout } from '../store/auth/actions';
import { openSnackbar } from '../store/snackbar/actions';
import { ERROR } from '../containers/Snackbar/utils';
import store from '../store';

const instance = axios.create();

instance.interceptors.request.use(
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

instance.interceptors.response.use(
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

export default instance;
