import { prop } from 'ramda';
import { createSelector } from 'reselect';

const root = prop('users');

export const getFilter = createSelector(
  root,
  prop('filter'),
);

export const getUsers = createSelector(
  root,
  prop('data'),
);

export const getUser = createSelector(
  root,
  prop('user'),
);

export const getUsersTotal = createSelector(
  root,
  prop('total'),
);
