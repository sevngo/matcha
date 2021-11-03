export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

export const openSnackbar = (snackbar) => ({ type: OPEN_SNACKBAR, snackbar });

export const closeSnackbar = () => ({ type: CLOSE_SNACKBAR });
