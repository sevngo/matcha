import { prop } from 'ramda';
import { createSelector } from 'reselect';

export const getAuth = prop('auth');

export const getToken = createSelector(
  getAuth,
  prop('token'),
);
