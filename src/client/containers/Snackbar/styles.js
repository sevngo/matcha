import { amber, green } from '@mui/material/colors';
import { SUCCESS, ERROR, INFO, WARNING } from './constants';
import makeStyles from '@mui/styles/makeStyles';

export default makeStyles((theme) => ({
  [SUCCESS]: {
    backgroundColor: green[600],
  },
  [ERROR]: {
    backgroundColor: theme.palette.error.dark,
  },
  [INFO]: {
    backgroundColor: theme.palette.primary.main,
  },
  [WARNING]: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));
