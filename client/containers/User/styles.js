import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

export default theme => ({
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
});
