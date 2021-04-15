import { length, prop, propOr, isEmpty, compose, split } from 'ramda';
import { createSelector } from 'reselect';

export const getAuth = prop('auth');

export const getIsAuthEmpty = createSelector(getAuth, isEmpty);

export const getAuthId = createSelector(getAuth, prop('_id'));

export const getAuthToken = createSelector(getAuth, prop('token'));

export const getAuthUsername = createSelector(getAuth, prop('username'));
export const getAuthBirthDate = createSelector(
  getAuth,
  compose(prop(0), split('T'), propOr('', 'birthDate'))
);
export const getAuthEmail = createSelector(getAuth, prop('email'));
export const getAuthGender = createSelector(getAuth, prop('gender'));
export const getAuthAddress = createSelector(getAuth, prop('address'));

export const getAuthDistance = createSelector(getAuth, prop('distance'));
export const getAuthImage = createSelector(getAuth, prop('image'));

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
