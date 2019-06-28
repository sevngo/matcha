import { useDispatch } from 'react-redux';
import { updateUser } from '../../actions';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    updateUser: user => dispatch(updateUser(user)),
  };
};
