import { useSelector, useDispatch } from 'react-redux';
import { getSnackbar } from '../../selectors';
import { closeSnackbar } from '../../actions';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    snackbar: useSelector(getSnackbar),
    closeSnackbar: () => dispatch(closeSnackbar()),
  };
};
