import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUser,
  getUsersLiked,
  getUsersBlocked,
  getFriends,
} from '../../selectors';
import { likeUser, blockUser, loadUser } from '../../actions';

export const useConnect = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const { _id: userId } = user;
  return {
    user,
    userId,
    usersLiked: useSelector(getUsersLiked),
    usersBlocked: useSelector(getUsersBlocked),
    friends: useSelector(getFriends),
    likeUser: useCallback(() => dispatch(likeUser(userId)), [dispatch, userId]),
    blockUser: useCallback(() => dispatch(blockUser(userId)), [
      dispatch,
      userId,
    ]),
    loadUser: useCallback((id) => dispatch(loadUser(id)), [dispatch]),
  };
};
