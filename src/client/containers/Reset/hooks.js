import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { updateUser } from '../../actions/auth';

export const useConnect = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  return {
    updateUser: useCallback((user) => dispatch(updateUser(user, token)), [
      dispatch,
      token,
    ]),
  };
};
