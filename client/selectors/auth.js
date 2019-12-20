import { prop } from 'ramda';
import { createSelector } from 'reselect';

export const getAuth = prop('auth');

export const getNotifications = createSelector(getAuth, prop('notifications'));
