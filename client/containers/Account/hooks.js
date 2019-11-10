import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions';
import { getAuthId } from '../../selectors';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    _id: useSelector(getAuthId),
    logout: () => dispatch(logout()),
  };
};
