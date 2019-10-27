import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  p3: {
    padding: theme.spacing(3),
  },
  red: {
    color: 'red',
  },
  img: {
    width: '100%',
  },
  mw500: {
    maxWidth: 500,
  },
  header: {
    backgroundColor: theme.palette.background.default,
  },
}));
