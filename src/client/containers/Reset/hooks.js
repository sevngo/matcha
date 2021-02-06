import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { updateUser } from '../../actions/auth';
import { getAuthId } from '../../selectors/auth';

export const useConnect = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  return {
    authId: useSelector(getAuthId),
    updateUser: useCallback(
      (id, user) => dispatch(updateUser(id, user, token)),
      [dispatch, token]
    ),
  };
};
