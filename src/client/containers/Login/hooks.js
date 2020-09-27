import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthToken } from '../../selectors';
import { forgotPassword, login } from '../../actions';

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
