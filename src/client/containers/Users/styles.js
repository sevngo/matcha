import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  displayNone: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  pagination: {
    [theme.breakpoints.down('xs')]: {
      '& .MuiTablePagination-caption:first-of-type': {
        display: 'none',
      },
    },
  },
  paper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  filter: {
    marginLeft: theme.spacing(1.5),
  },
}));
