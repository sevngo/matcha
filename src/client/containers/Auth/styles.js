import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mt2: {
    marginTop: theme.spacing(1),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: 500,
    margin: 'auto',
  },
  dialogTitle: {
    textAlign: 'center',
  },
}));
