import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { createStructuredSelector } from 'reselect';
import { withSnackbar } from 'notistack';
import { forEach, includes } from 'ramda';
import { removeNotification } from '../../actions';
import { getNotifications } from '../../selectors';

const Notifications = ({ notifications, enqueueSnackbar, removeNotification }) => {
  const [displayed, handleDsiplayed] = useState([]);
  useEffect(() => {
    forEach(notification => {
      if (includes(notification.key)(displayed)) return;
      enqueueSnackbar(notification.message, notification.options);
      handleDsiplayed([...displayed, notification.key]);
      removeNotification(notification.key);
    })(notifications);
  });
  return false;
};

const mapStateToProps = createStructuredSelector({
  notifications: getNotifications,
});

export default compose(
  connect(
    mapStateToProps,
    { removeNotification },
  ),
  withSnackbar,
)(Notifications);
