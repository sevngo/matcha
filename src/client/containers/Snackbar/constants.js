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
