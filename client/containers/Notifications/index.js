import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { compose, path, length, isEmpty } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Typography, Grid, Icon, Divider, Badge, IconButton } from '@material-ui/core';
import Popover from '../../components/Popover';
import { removeNotification } from '../../actions';
import { getNotifications } from '../../selectors';
import useStyles from './styles';
import messages from './messages';

const Notifications = () => {
  const classes = useStyles();
  const notifications = useSelector(getNotifications);
  const dispatch = useDispatch();
  const [anchorEl, handlePopover] = useState();
  const hasNotifications = isEmpty(notifications);
  const notificationsLength = length(notifications);
  return (
    <Fragment>
      <IconButton color="inherit" onClick={e => handlePopover(e.currentTarget)}>
        <Badge badgeContent={notificationsLength} color="error">
          <Icon>notifications_icon</Icon>
        </Badge>
      </IconButton>
      {!hasNotifications && (
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
                    onClick={() => dispatch(removeNotification(notification._id))}
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
      )}
    </Fragment>
  );
};

export default compose(withRouter)(Notifications);
