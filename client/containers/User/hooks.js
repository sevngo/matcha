import { useSelector } from 'react-redux';
import { getAuth } from '../../selectors';

export const useConnect = () => {
  return {
    auth: useSelector(getAuth),
  };
};
