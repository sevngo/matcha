import { useDispatch } from 'react-redux';
import { updateUser } from '../../actions';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    updateUser: (token, user) => dispatch(updateUser(token, user)),
  };
};
