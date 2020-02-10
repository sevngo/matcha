import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleFilter, loadUsers } from '../actions';
import { getFilter, getUsers, getUsersTotal } from '../selectors';

export const useUsers = () => {
  const dispatch = useDispatch();
  return {
    users: useSelector(getUsers),
    total: useSelector(getUsersTotal),
    loadUsers: useCallback(filter => dispatch(loadUsers(filter)), [dispatch]),
  };
};

export const useFilter = () => {
  const dispatch = useDispatch();
  return {
    filter: useSelector(getFilter),
    handleFilter: useCallback(filter => dispatch(handleFilter(filter)), [dispatch]),
  };
};
