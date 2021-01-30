import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthUsersBlocked, getAuthForm, getAuthCard } from '../../selectors';
import { uploadImage, likeUser, updateUser } from '../../actions';
import { compact } from '../../utils';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    authForm: useSelector(getAuthForm),
    authCard: useSelector(getAuthCard),
    usersBlocked: useSelector(getAuthUsersBlocked),
    updateUser: useCallback((values) => dispatch(updateUser(compact(values))), [
      dispatch,
    ]),
    uploadImage: useCallback((image) => dispatch(uploadImage(image)), [
      dispatch,
    ]),
    likeUser: useCallback((userId) => dispatch(likeUser(userId)), [dispatch]),
  };
};
