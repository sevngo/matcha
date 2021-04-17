import {
  Badge,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React, { Fragment, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useConnect } from './hooks';
import messages from './messages';
import useStyles from './styles';

const Notifications = () => {
  const {
    notifications,
    notificationsLength,
    deleteNotification,
  } = useConnect();
  const classes = useStyles();
  const [isDialogOpen, handleDialog] = useState(false);
  return (
    <Fragment>
      <IconButton
        data-testid="openNotifications"
        color="inherit"
        onClick={() => handleDialog(true)}
      >
        <Badge badgeContent={notificationsLength} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      {notificationsLength !== 0 && (
        <Dialog
          data-testid="notifications"
          open={isDialogOpen}
          onClose={() => handleDialog(false)}
        >
          <DialogTitle>
            <FormattedMessage {...messages.title} />
          </DialogTitle>
          <DialogContent>
            <Grid container direction="column" spacing={2}>
              {notifications.map((notification, index) => (
                <Fragment key={notification.id}>
                  <Grid
                    container
                    item
                    justify="space-between"
                    alignItems="center"
                  >
                    <Typography variant="subtitle1">
                      <FormattedMessage
                        {...messages[notification.event]}
                        values={{
                          username: notification.user?.username,
                        }}
                      />
                    </Typography>
                    <DeleteIcon
                      data-testid={`remove-${notification.id}`}
                      onClick={() => deleteNotification(notification.id)}
                      color="inherit"
                      className={classes.ml1}
                    />
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
