import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUser,
  getIsUserFriended,
  getIsUserLiked,
} from '../../selectors/user';
import { likeUser, dislikeUser } from '../../actions/auth';
import { loadUser } from '../../actions/user';

export const useConnect = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const { _id: userId } = user;
  return {
    user,
    userId,
    isUserFriended: useSelector(getIsUserFriended),
    isUserLiked: useSelector(getIsUserLiked),
    likeUser: useCallback(() => dispatch(likeUser(userId)), [dispatch, userId]),
    dislikeUser: useCallback(() => dispatch(dislikeUser(userId)), [
      dispatch,
      userId,
    ]),
    loadUser: useCallback((id) => dispatch(loadUser(id)), [dispatch]),
  };
};
