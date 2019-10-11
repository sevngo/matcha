import { useSelector } from 'react-redux';
import { getMyUser } from '../../selectors';

export const useConnect = () => {
  return {
    myUser: useSelector(getMyUser),
  };
};
