import makeStyles from '@mui/styles/makeStyles';

export default makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
