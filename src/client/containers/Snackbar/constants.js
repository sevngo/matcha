import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

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
