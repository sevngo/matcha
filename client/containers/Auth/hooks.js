import { useDispatch } from 'react-redux';
import { register, login, forgotPassword } from '../../actions';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    login: user => dispatch(login(user)),
    register: user => dispatch(register(user)),
    forgotPassword: user => dispatch(forgotPassword(user)),
  };
};
