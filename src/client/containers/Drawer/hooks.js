import { useSelector, useDispatch } from 'react-redux';
import { getUsersFilter } from '../../selectors';
import { handleFilter } from '../../actions';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    filter: useSelector(getUsersFilter),
    handleFilter: (values) => dispatch(handleFilter(values)),
  };
};
