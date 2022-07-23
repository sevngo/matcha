import { amber, green } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

export const SUCCESS = 'SUCCESS';
export const WARNING = 'WARNING';
export const ERROR = 'ERROR';
export const INFO = 'INFO';

export const variantIcon = {
  [SUCCESS]: CheckCircleIcon,
  [WARNING]: WarningIcon,
  [ERROR]: ErrorIcon,
  [INFO]: InfoIcon,
};

export const variantColor = (variant) => {
  switch (variant) {
    case SUCCESS:
      return { backgroundColor: green[600] };
    case ERROR:
      return { backgroundColor: (theme) => theme.palette.error.dark };
    case WARNING:
      return { backgroundColor: amber[700] };
    default:
      return { backgroundColor: (theme) => theme.palette.primary.main };
  }
};
