import { useSelector, useDispatch } from 'react-redux';
import { getUsersFilter } from '../../selectors/users';
import { handleFilter } from '../../actions/users';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    filter: useSelector(getUsersFilter),
    handleFilter: (values) => dispatch(handleFilter(values)),
  };
};
