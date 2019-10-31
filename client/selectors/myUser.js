import { prop } from 'ramda';
import { createSelector } from 'reselect';

export const getMyUser = prop('myUser');

export const getToken = createSelector(
  getMyUser,
  prop('token'),
);

export const getNotifications = createSelector(
  getMyUser,
  prop('notifications'),
);

export const getMyUserId = createSelector(
  getMyUser,
  prop('_id'),
);
