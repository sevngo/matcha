import { random } from 'faker';

export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

export const success = message => ({
  message,
  options: { variant: 'success' },
});

export const error = {
  message: 'Something wrong happened',
  options: { variant: 'error' },
};

export const enqueueSnackbar = snackbar => ({
  type: ENQUEUE_SNACKBAR,
  snackbar: {
    key: random.uuid(),
    ...snackbar,
  },
});

export const removeSnackbar = key => ({
  type: REMOVE_SNACKBAR,
  key,
});
