import { random } from 'faker';

export const LOADING = 'LOADING';
export const ENQUEUE_NOTIFICATION = 'ENQUEUE_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const success = message => ({
  message,
  options: { variant: 'success' },
});

export const error = {
  message: 'Something wrong happened',
  options: { variant: 'error' },
};

export const enqueueNotification = notification => ({
  type: ENQUEUE_NOTIFICATION,
  notification: {
    key: random.uuid(),
    ...notification,
  },
});

export const removeNotification = key => ({
  type: REMOVE_NOTIFICATION,
  key,
});
