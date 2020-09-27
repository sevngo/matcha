import { prop, propOr } from 'ramda';
import { createSelector } from 'reselect';

export const getAuth = prop('auth');

export const getAuthId = createSelector(getAuth, prop('_id'));

export const getAuthToken = createSelector(getAuth, prop('token'));

export const getAuthUsersBlocked = createSelector(
  getAuth,
  propOr([], 'usersBlocked')
);

export const getAuthUsersLiked = createSelector(
  getAuth,
  propOr([], 'usersLiked')
);

export const getAuthFriends = createSelector(getAuth, propOr([], 'friends'));

export const getAuthNotifications = createSelector(
  getAuth,
  propOr([], 'notifications')
);
