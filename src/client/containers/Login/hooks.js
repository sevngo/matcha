import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword, login } from '../../actions/auth';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    login: useCallback((values) => dispatch(login(values)), [dispatch]),
    forgotPassword: useCallback((values) => dispatch(forgotPassword(values)), [
      dispatch,
    ]),
  };
};
