import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthToken } from '../../selectors/auth';
import { forgotPassword, login } from '../../actions/auth';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    token: useSelector(getAuthToken),
    login: useCallback((values) => dispatch(login(values)), [dispatch]),
    forgotPassword: useCallback((values) => dispatch(forgotPassword(values)), [
      dispatch,
    ]),
  };
};
