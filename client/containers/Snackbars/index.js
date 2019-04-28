import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withSnackbar } from 'notistack';
import { forEach, includes } from 'ramda';
import { removeSnackbar } from '../../actions';
import { getSnackbars } from '../../selectors';

const Component = ({ snackbars, enqueueSnackbar, removeSnackbar }) => {
  const [displayed, handleDsiplayed] = useState([]);
  useEffect(() => {
    forEach(snackbar => {
      if (includes(snackbar.key)(displayed)) return;
      enqueueSnackbar(snackbar.message, snackbar.options);
      handleDsiplayed([...displayed, snackbar.key]);
      removeSnackbar(snackbar.key);
    })(snackbars);
  });
  return false;
};

const mapStateToProps = createStructuredSelector({
  snackbars: getSnackbars,
});

export default connect(
  mapStateToProps,
  { removeSnackbar },
)(withSnackbar(Component));
