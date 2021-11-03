import { compose, find, prop } from 'ramda';
import { createSelector } from 'reselect';
import { getAuthFriends, getAuthUsersLiked } from '../auth/selectors';

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

export const getIsUserFriended = createSelector(
  getUserId,
  getAuthFriends,
  (userId, friends) =>
    compose(
      Boolean,
      find((friend) => friend._id === userId)
    )(friends)
);
