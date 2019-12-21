import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4a148c',
    },
    secondary: {
      main: '#e1bee7',
    },
  },
  overrides: {
    MuiInputBase: {
      root: {
        '&$disabled': {
          color: '',
        },
      },
    },
    MuiFormLabel: {
      root: {
        '&$disabled': {
          color: '',
        },
      },
    },
    MuiFormControlLabel: {
      label: {
        '&$disabled': {
          color: '',
        },
      },
    },
    MuiIconButton: {
      root: {
        '&$disabled': {
          color: '',
        },
      },
    },
  },
});
