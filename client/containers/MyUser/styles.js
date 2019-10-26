import { makeStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

export default makeStyles(theme => ({
  p3: {
    padding: theme.spacing(3),
  },
  ml1: {
    marginLeft: theme.spacing(1),
  },
  ml3: {
    marginLeft: theme.spacing(3),
  },
  mt1: {
    marginTop: theme.spacing(1),
  },
  w100: {
    width: '100%',
  },
  mw500: {
    maxWidth: 500,
  },
  hide: {
    display: 'none',
  },
  like: {
    color: blue[700],
    marginLeft: theme.spacing(1),
  },
  header: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    width: '100%',
  },
}));
