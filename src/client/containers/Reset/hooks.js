import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { updateUser } from '../../actions';

export const useConnect = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  return {
    updateUser: useCallback((values) => dispatch(updateUser(values, token)), [
      dispatch,
      token,
    ]),
  };
};
