import { prop } from 'ramda';
import { createSelector } from 'reselect';

const root = prop('myUser');

export const getMyUser = createSelector(
  root,
  prop('data'),
);

export const getToken = createSelector(
  root,
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
