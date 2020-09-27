import { compose, find, prop } from 'ramda';
import { createSelector } from 'reselect';
import { getAuthFriends, getAuthUsersBlocked, getAuthUsersLiked } from './auth';

export const getUser = prop('user');

export const getUserId = createSelector(getUser, prop('_id'));

export const getIsUserLiked = createSelector(
  getUserId,
  getAuthUsersLiked,
  (userId, usersLiked) =>
    compose(
      Boolean,
      find((userLiked) => userLiked._id === userId)
    )(usersLiked)
);

export const getIsUserBlocked = createSelector(
  getUserId,
  getAuthUsersBlocked,
  (userId, usersBlocked) =>
    compose(
      Boolean,
      find((userBlocked) => userBlocked._id === userId)
    )(usersBlocked)
);

export const getIsUserFriended = createSelector(
  getUserId,
  getAuthFriends,
  (userId, friends) =>
    compose(
      Boolean,
      find((friend) => friend._id === userId)
    )(friends)
);
