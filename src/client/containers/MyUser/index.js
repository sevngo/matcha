import { Box, Grid, Grow, IconButton, Paper, Tooltip } from '@material-ui/core';
import CloudUpload from '@material-ui/icons/CloudUpload';
import React, { Fragment, useCallback, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import UserCard from '../../components/UserCard';
import UserForm from '../../components/UserForm';
import UsersList from '../../components/UsersList';
import { useConnect } from './hooks';
import messages from './messages';
import useStyles from './styles';

const MyUser = () => {
  const classes = useStyles();
  const inputEl = useRef();
  const {
    _id,
    usersBlocked,
    updateUser,
    uploadImage,
    likeUser,
    username,
    birthDate,
    email,
    gender,
    address,
    image,
  } = useConnect();
  const intl = useIntl();
  const openFile = useCallback(() => inputEl.current.click(), []);
  const uploadFile = (event) => {
    const image = event.target.files[0];
    if (image) uploadImage(_id, image);
  };
  return (
    <Grid container spacing={2}>
      <Grow in={true} timeout={200}>
        <Grid item xs={12} sm={6} md={7}>
          <UserCard
            user={{ _id, username, birthDate, image }}
            actions={
              <Fragment>
                <input
                  data-testid="uploadFile"
                  ref={inputEl}
                  type="file"
                  onChange={uploadFile}
                  accept="image/png, image/jpeg"
                  className={classes.hide}
                />
                <Tooltip title={<FormattedMessage {...messages.uploadImage} />}>
                  <IconButton data-testid="openFile" onClick={openFile}>
                    <CloudUpload color="primary" />
                  </IconButton>
                </Tooltip>
              </Fragment>
            }
          />
          <Box m={2} />
          {usersBlocked[0] && (
            <Grow in={true} timeout={600}>
              <UsersList
                users={usersBlocked}
                action={likeUser}
                title={intl.formatMessage(messages.usersBlocked)}
                actionMessage={intl.formatMessage(messages.likeUser)}
              />
            </Grow>
          )}
        </Grid>
      </Grow>
      <Grow in={true} timeout={400}>
        <Grid item xs={12} sm={6} md={5}>
          <Paper elevation={1} className={classes.p3}>
            <UserForm
              initialValues={{
                username,
                birthDate,
                email,
                gender,
                address,
              }}
              submit={updateUser}
            />
          </Paper>
        </Grid>
      </Grow>
    </Grid>
  );
};

export default MyUser;
