import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAuthId,
  getAuthUsername,
  getAuthBirthDate,
  getAuthEmail,
  getAuthGender,
  getAuthAddress,
  getAuthImage,
  getAuthUsersLiked,
} from '../../selectors/auth';
import { uploadImage, updateUser, dislikeUser } from '../../actions/auth';
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
    usersLiked: useSelector(getAuthUsersLiked),
    dislikeUser: useCallback((userId) => dispatch(dislikeUser(userId)), [
      dispatch,
    ]),
    updateUser: useCallback((user) => dispatch(updateUser(compact(user))), [
      dispatch,
    ]),
    uploadImage: useCallback((id, image) => dispatch(uploadImage(id, image)), [
      dispatch,
    ]),
  };
};
