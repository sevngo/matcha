import { prop, propOr } from 'ramda';
import { createSelector } from 'reselect';

export const getAuth = prop('auth');

export const getUsersBlocked = createSelector(getAuth, propOr([], 'usersBlocked'));

export const getUsersLiked = createSelector(getAuth, propOr([], 'usersLiked'));

export const getFriends = createSelector(getAuth, propOr([], 'friends'));

export const getNotifications = createSelector(getAuth, propOr([], 'notifications'));
