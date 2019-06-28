import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions';
import { getMyUserId } from '../../selectors';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    _id: useSelector(getMyUserId),
    logout: () => dispatch(logout()),
  };
};
