import React, { Fragment, useRef, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid, Paper, Grow, IconButton, Box, Tooltip } from '@material-ui/core';
import { useIntl } from 'react-intl';
import CloudUpload from '@material-ui/icons/CloudUpload';
import { split } from 'ramda';
import UserForm from '../../components/UserForm';
import useStyles from './styles';
import messages from './messages';
import UserCard from '../../components/UserCard';
import { useConnect } from './hooks';
import UsersList from '../../components/UsersList';

const MyUser = () => {
  const classes = useStyles();
  const inputEl = useRef();
  const {
    authCard,
    authForm,
    usersBlocked,
    updateUser,
    uploadImage,
    likeUser,
  } = useConnect();
  const intl = useIntl();
  const openFile = useCallback(() => inputEl.current.click(), []);
  const uploadFile = (event) => {
    const image = event.target.files[0];
    if (image) uploadImage(image);
  };
  const birthDate = split('T')(authForm.birthDate)[0];
  return (
    <Grid container spacing={2}>
      <Grow in={true} timeout={200}>
        <Grid item xs={12} sm={6} md={7}>
          <UserCard
            user={authCard}
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
              id="myUser"
              initialValues={{
                ...authForm,
                birthDate,
              }}
              submit={updateUser}
              newPasswordLabel
            />
          </Paper>
        </Grid>
      </Grow>
    </Grid>
  );
};

export default MyUser;
