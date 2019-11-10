import { prop } from 'ramda';
import { createSelector } from 'reselect';

export const getAuth = prop('auth');

export const getToken = createSelector(getAuth, prop('token'));

export const getNotifications = createSelector(getAuth, prop('notifications'));

export const getAuthId = createSelector(getAuth, prop('_id'));
