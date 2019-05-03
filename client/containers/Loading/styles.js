export default theme => ({
  root: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    top: '0',
    left: '0',
    zIndex: theme.zIndex.tooltip + 1,
  },
  loader: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: theme.zIndex.tooltip + 1,
  },
});
