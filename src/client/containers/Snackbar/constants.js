import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';

export const SUCCESS = 'success';
export const WARNING = 'warning';
export const ERROR = 'error';
export const INFO = 'info';

export const variantIcon = {
  [SUCCESS]: CheckCircleIcon,
  [WARNING]: WarningIcon,
  [ERROR]: ErrorIcon,
  [INFO]: InfoIcon,
};
