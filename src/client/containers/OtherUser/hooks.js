import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getUser,
  getUsersLiked,
  getUsersBlocked,
  getFriends,
} from '../../selectors';
import { likeUser, blockUser, loadUser } from '../../actions';
import { useParams } from 'react-router';

export const useConnect = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector(getUser);
  const { _id } = user;
  return {
    user,
    usersLiked: useSelector(getUsersLiked),
    usersBlocked: useSelector(getUsersBlocked),
    friends: useSelector(getFriends),
    likeUser: useCallback(() => dispatch(likeUser(_id)), [dispatch, _id]),
    blockUser: useCallback(() => dispatch(blockUser(_id)), [dispatch, _id]),
    loadUser: useCallback(() => dispatch(loadUser(id)), [dispatch, id]),
  };
};
