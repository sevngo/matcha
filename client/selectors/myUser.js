import { prop } from 'ramda';
import { createSelector } from 'reselect';

export const getMyUser = prop('myUser');

export const getToken = createSelector(
  getMyUser,
  prop('token'),
);
