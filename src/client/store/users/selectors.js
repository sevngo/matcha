import { prop, propOr } from 'ramda';
import { createSelector } from 'reselect';

const getUsers = prop('users');

export const getUsersFilter = createSelector(getUsers, propOr({}, 'filter'));

export const getUsersData = createSelector(getUsers, propOr([], 'data'));

export const getUsersTotal = createSelector(getUsers, propOr(0, 'total'));
