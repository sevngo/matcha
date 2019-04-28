import { prop } from 'ramda';
import { createSelector } from 'reselect';

export const getApp = prop('app');

export const getNotifications = createSelector(
  getApp,
  prop('notifications'),
);

export const getIsLoading = createSelector(
  getApp,
  prop('isLoading'),
);
