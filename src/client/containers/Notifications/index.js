import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { path, length } from 'ramda';
import { FormattedMessage } from 'react-intl';
import {
  Typography,
  Grid,
  Icon,
  Divider,
  Badge,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { removeNotification } from '../../actions';
import { getNotifications } from '../../selectors';
import useStyles from './styles';
import messages from './messages';

const Notifications = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const notifications = useSelector(getNotifications);
  const [isDialogOpen, handleDialog] = useState(false);
  const notificationsLength = length(notifications);
  return (
    <Fragment>
      <IconButton color="inherit" onClick={() => handleDialog(true)}>
        <Badge badgeContent={notificationsLength} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      {notificationsLength !== 0 && (
        <Dialog open={isDialogOpen} onClose={() => handleDialog(false)}>
          <DialogTitle>
            <FormattedMessage {...messages.title} />
          </DialogTitle>
          <DialogContent>
            <Grid container direction="column" spacing={2}>
              {notifications.map((notification, index) => (
                <Fragment key={notification._id}>
                  <Grid
                    container
                    item
                    justify="space-between"
                    alignItems="center"
                  >
                    <Typography variant="subtitle1">
                      <FormattedMessage
                        {...messages[notification.messageId]}
                        values={{
                          username: path(['user', 'username'])(notification),
                        }}
                      />
                    </Typography>
                    <Icon
                      onClick={() =>
                        dispatch(removeNotification(notification._id))
                      }
                      color="inherit"
                      className={classes.ml1}
                    >
                      delete
                    </Icon>
                  </Grid>
                  {notificationsLength - 1 !== index && <Divider />}
                </Fragment>
              ))}
            </Grid>
          </DialogContent>
        </Dialog>
      )}
    </Fragment>
  );
};

export default Notifications;
