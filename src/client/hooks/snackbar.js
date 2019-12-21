import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSnackbar } from '../selectors';
import { closeSnackbar } from '../actions';

export const useSnackbar = () => {
  const dispatch = useDispatch();
  return {
    snackbar: useSelector(getSnackbar),
    closeSnackbar: useCallback(() => dispatch(closeSnackbar()), [dispatch]),
  };
};
