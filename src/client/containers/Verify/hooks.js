import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { updateUser } from '../../actions/auth';
import { getIsAuthEmpty } from '../../selectors/auth';

export const useConnect = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  return {
    isAuthEmpty: useSelector(getIsAuthEmpty),
    updateUser: useCallback((user) => dispatch(updateUser(user, token)), [
      dispatch,
      token,
    ]),
  };
};
