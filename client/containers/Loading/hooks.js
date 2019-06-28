import { useSelector } from 'react-redux';
import { getIsLoading } from '../../selectors';

export const useConnect = () => {
  return {
    isLoading: useSelector(getIsLoading),
  };
};
