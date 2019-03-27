import { createSelector } from 'reselect';
import { prop } from 'ramda';

export const getAuth = prop('auth');
