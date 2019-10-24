import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';

export default makeStyles(theme => ({
  p3: {
    padding: theme.spacing(3),
  },
  width: {
    maxWidth: 500,
  },
  block: {
    color: theme.palette.getContrastText(red[700]),
    backgroundColor: red[700],
    '&:hover': {
      backgroundColor: red[900],
    },
    width: '100%',
  },
  like: {
    color: theme.palette.getContrastText(blue[700]),
    backgroundColor: blue[700],
    '&:hover': {
      backgroundColor: blue[900],
    },
    width: '100%',
  },
  friend: {
    color: theme.palette.getContrastText(green[700]),
    backgroundColor: green[700],
    '&:hover': {
      backgroundColor: green[900],
    },
    width: '100%',
  },
  img: {
    width: '100%',
  },
  mw500: {
    maxWidth: 500,
  },
}));
