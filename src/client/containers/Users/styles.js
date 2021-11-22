import makeStyles from '@mui/styles/makeStyles';

export default makeStyles((theme) => ({
  displayNone: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  pagination: {
    [theme.breakpoints.down('sm')]: {
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
