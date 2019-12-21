import { useSelector } from 'react-redux';
import { getIsLoading } from '../selectors';

export const useApp = () => {
  return {
    isLoading: useSelector(getIsLoading),
  };
};
