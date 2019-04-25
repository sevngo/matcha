export default theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(4),
  },
});
