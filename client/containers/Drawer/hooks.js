import { useDispatch, useSelector } from 'react-redux';
import { handleFilter } from '../../actions';
import { getFilter } from '../../selectors';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    filter: useSelector(getFilter),
    handleFilter: filter => dispatch(handleFilter(filter)),
  };
};
