import React, { useState, Fragment } from 'react';
import { path, length } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Typography, Grid, Icon, Divider, Badge, IconButton } from '@material-ui/core';
import Popover from '../../components/Popover';
import { useConnect } from './hooks';
import useStyles from './styles';
import messages from './messages';

const Notifications = () => {
  const classes = useStyles();
  const { removeNotification, notifications = [] } = useConnect();
  const [anchorEl, handlePopover] = useState();
  const notificationsLength = length(notifications) || 0;
  return (
    <Fragment>
      <IconButton color="inherit" onClick={e => handlePopover(e.currentTarget)}>
        <Badge badgeContent={notificationsLength} color="error">
          <Icon>notifications_icon</Icon>
        </Badge>
      </IconButton>
      <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => handlePopover()}>
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
      </Popover>
    </Fragment>
  );
};

export default Notifications;
