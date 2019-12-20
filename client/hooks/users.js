import { useDispatch, useSelector } from 'react-redux';
import { handleFilter, loadUsers } from '../actions';
import { getFilter, getUsers, getUsersTotal } from '../selectors';

export const useUsers = () => {
  const dispatch = useDispatch();
  return {
    users: useSelector(getUsers),
    total: useSelector(getUsersTotal),
    loadUsers: (token, filter) => dispatch(loadUsers(token, filter)),
  };
};

export const useFilter = () => {
  const dispatch = useDispatch();
  return {
    filter: useSelector(getFilter),
    handleFilter: filter => dispatch(handleFilter(filter)),
  };
};
