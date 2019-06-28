import { useDispatch, useSelector } from 'react-redux';
import { enqueueSnackbar, removeSnackbar } from '../../actions';
import { getSnackbars } from '../../selectors';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    snackbars: useSelector(getSnackbars),
    enqueueSnackbar: snackbar => dispatch(enqueueSnackbar(snackbar)),
    removeSnackbar: key => dispatch(removeSnackbar(key)),
  };
};
