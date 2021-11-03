import { useSelector, useDispatch } from 'react-redux';
import { getUsersFilter } from '../../store/users/selectors';
import { handleFilter } from '../../store/users/actions';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    filter: useSelector(getUsersFilter),
    handleFilter: (values) => dispatch(handleFilter(values)),
  };
};
