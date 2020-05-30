import { prop, propOr } from 'ramda';
import { createSelector } from 'reselect';

export const getAuth = prop('auth');

export const getId = createSelector(getAuth, prop('_id'));
export const getUsername = createSelector(getAuth, prop('username'));
export const getBirthDate = createSelector(getAuth, prop('birthDate'));
export const getEmail = createSelector(getAuth, prop('email'));
export const getGender = createSelector(getAuth, prop('gender'));
export const getAddress = createSelector(getAuth, prop('address'));

export const getToken = createSelector(getAuth, prop('token'));

export const getImages = createSelector(getAuth, propOr([], 'images'));

export const getUsersBlocked = createSelector(
  getAuth,
  propOr([], 'usersBlocked')
);

export const getUsersLiked = createSelector(getAuth, propOr([], 'usersLiked'));

export const getFriends = createSelector(getAuth, propOr([], 'friends'));

export const getNotifications = createSelector(
  getAuth,
  propOr([], 'notifications')
);
