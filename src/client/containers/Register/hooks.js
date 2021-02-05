import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../actions/auth';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    register: useCallback((values) => dispatch(register(values)), [dispatch]),
  };
};
