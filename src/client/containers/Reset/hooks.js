import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { updateUser } from '../../store/auth/actions';
import { getIsAuthEmpty } from '../../store/auth/selectors';

export const useConnect = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  return {
    isAuthEmpty: useSelector(getIsAuthEmpty),
    updateUser: useCallback(
      (user) => dispatch(updateUser(user, token)),
      [dispatch, token]
    ),
  };
};
