import { useSelector } from 'react-redux';
import { getToken } from '../../selectors';

export const useConnect = () => {
  return {
    token: useSelector(getToken),
  };
};
