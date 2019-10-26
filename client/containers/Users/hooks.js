import { useDispatch, useSelector } from 'react-redux';
import { loadUsers, handleFilter } from '../../actions';
import { getToken, getUsers, getFilter, getUsersTotal } from '../../selectors';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    token: useSelector(getToken),
    users: useSelector(getUsers),
    filter: useSelector(getFilter),
    total: useSelector(getUsersTotal),
    handleFilter: filter => dispatch(handleFilter(filter)),
    loadUsers: (token, filter) => dispatch(loadUsers(token, filter)),
  };
};
