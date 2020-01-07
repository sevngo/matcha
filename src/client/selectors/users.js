import { prop, propOr } from 'ramda';
import { createSelector } from 'reselect';

const root = prop('users');

export const getFilter = createSelector(root, propOr({}, 'filter'));

export const getUsers = createSelector(root, propOr([], 'data'));

export const getUsersTotal = createSelector(root, prop('total'));
