import React, { useState, Fragment } from 'react';
import { path, length } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Typography, Grid, Icon, Divider, Badge, IconButton } from '@material-ui/core';
import Modal from '../../components/Modal';
import { useNotifications } from '../../hooks';
import useStyles from './styles';
import messages from './messages';

const Notifications = () => {
  const classes = useStyles();
  const { removeNotification, notifications = [] } = useNotifications();
  const [isModalOpen, handleModal] = useState(false);
  const notificationsLength = length(notifications);
  return (
    <Fragment>
      <IconButton color="inherit" onClick={() => handleModal(true)}>
        <Badge badgeContent={notificationsLength} color="error">
          <Icon>notifications_icon</Icon>
        </Badge>
      </IconButton>
      {notificationsLength !== 0 && (
        <Modal title={messages.title} open={isModalOpen} onClose={() => handleModal(false)}>
          <Grid container direction="column" spacing={2}>
            {notifications.map((notification, index) => (
              <Fragment key={notification._id}>
                <Grid container item justify="space-between" alignItems="center">
                  <Typography variant="subtitle1">
                    <FormattedMessage
                      {...messages[notification.messageId]}
                      values={{ username: path(['user', 'username'])(notification) }}
                    />
                  </Typography>
                  <Icon
                    onClick={() => removeNotification(notification._id)}
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
        </Modal>
      )}
    </Fragment>
  );
};

export default Notifications;
