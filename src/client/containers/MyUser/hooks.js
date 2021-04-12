import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAuthUsersBlocked,
  getAuthId,
  getAuthUsername,
  getAuthBirthDate,
  getAuthEmail,
  getAuthGender,
  getAuthAddress,
  getAuthImage,
} from '../../selectors/auth';
import { uploadImage, likeUser, updateUser } from '../../actions/auth';
import { compact } from '../../utils';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    _id: useSelector(getAuthId),
    username: useSelector(getAuthUsername),
    birthDate: useSelector(getAuthBirthDate),
    email: useSelector(getAuthEmail),
    gender: useSelector(getAuthGender),
    address: useSelector(getAuthAddress),
    image: useSelector(getAuthImage),
    usersBlocked: useSelector(getAuthUsersBlocked),
    updateUser: useCallback((user) => dispatch(updateUser(compact(user))), [
      dispatch,
    ]),
    uploadImage: useCallback((id, image) => dispatch(uploadImage(id, image)), [
      dispatch,
    ]),
    likeUser: useCallback((userId) => dispatch(likeUser(userId)), [dispatch]),
  };
};
