import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../actions';
import { getUser } from '../selectors';

export const useUser = () => {
  const dispatch = useDispatch();
  return {
    user: useSelector(getUser),
    loadUser: (auth, id) => dispatch(loadUser(auth, id)),
  };
};
