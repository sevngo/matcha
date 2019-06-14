import { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { compose } from 'ramda';
import { withSnackbar } from 'notistack';
import { forEach, includes } from 'ramda';
import { removeSnackbar } from '../../actions';
import { getSnackbars } from '../../selectors';

const Snackbars = ({ enqueueSnackbar, removeSnackbar }) => {
  const [displayed, handleDsiplayed] = useState([]);
  const snackbars = useSelector(getSnackbars);
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

export default compose(
  connect(
    null,
    { removeSnackbar },
  ),
  withSnackbar,
)(Snackbars);
