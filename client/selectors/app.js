import { prop } from 'ramda';
import { createSelector } from 'reselect';

export const getApp = prop('app');

export const getSnackbars = createSelector(
  getApp,
  prop('snackbars'),
);

export const getIsLoading = createSelector(
  getApp,
  prop('isLoading'),
);
