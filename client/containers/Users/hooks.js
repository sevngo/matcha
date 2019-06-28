import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from '../../actions';
import { getToken, getUsers, getFilter } from '../../selectors';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    token: useSelector(getToken),
    users: useSelector(getUsers),
    filter: useSelector(getFilter),
    loadUsers: (token, filter) => dispatch(loadUsers(token, filter)),
  };
};
