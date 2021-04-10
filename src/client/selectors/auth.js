import { length, prop, propOr, pick, isEmpty } from 'ramda';
import { createSelector } from 'reselect';

export const getAuth = prop('auth');

export const getIsAuthEmpty = createSelector(getAuth, isEmpty);

export const getAuthId = createSelector(getAuth, prop('_id'));

export const getAuthToken = createSelector(getAuth, prop('token'));

export const getAuthForm = createSelector(
  getAuth,
  pick(['username', 'birthDate', 'email', 'gender', 'address'])
);

export const getAuthCard = createSelector(
  getAuth,
  pick(['_id', 'distance', 'username', 'birthDate', 'image'])
);

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

export const getAuthNotificationsLength = createSelector(
  getAuthNotifications,
  length
);
