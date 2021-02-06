import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAuthUsersBlocked,
  getAuthForm,
  getAuthCard,
  getAuthId,
} from '../../selectors/auth';
import { uploadImage, likeUser, updateUser } from '../../actions/auth';
import { compact } from '../../utils';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    authId: useSelector(getAuthId),
    authForm: useSelector(getAuthForm),
    authCard: useSelector(getAuthCard),
    usersBlocked: useSelector(getAuthUsersBlocked),
    updateUser: useCallback(
      (id, user) => dispatch(updateUser(id, compact(user))),
      [dispatch]
    ),
    uploadImage: useCallback((id, image) => dispatch(uploadImage(id, image)), [
      dispatch,
    ]),
    likeUser: useCallback((userId) => dispatch(likeUser(userId)), [dispatch]),
  };
};
