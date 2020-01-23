import { prop, propOr } from 'ramda';
import { createSelector } from 'reselect';

export const getAuth = prop('auth');

export const getNotifications = createSelector(getAuth, propOr([], 'notifications'));
