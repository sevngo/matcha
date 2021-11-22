import { Box, Grid, IconButton, Paper, Tooltip } from '@mui/material';
import CloudUpload from '@mui/icons-material/CloudUpload';
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
    updateUser,
    uploadImage,
    username,
    birthDate,
    email,
    gender,
    address,
    image,
    usersLiked,
    dislikeUser,
  } = useConnect();
  const intl = useIntl();

  const openFile = useCallback(() => inputEl.current.click(), []);
  const uploadFile = (event) => {
    const image = event.target.files[0];
    if (image) uploadImage(_id, image);
  };
  return (
    <Grid container spacing={2}>
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
                <IconButton
                  data-testid="openFile"
                  onClick={openFile}
                  size="large"
                >
                  <CloudUpload color="primary" />
                </IconButton>
              </Tooltip>
            </Fragment>
          }
        />
        <Box m={2} />
        {usersLiked[0] && (
          <UsersList
            users={usersLiked}
            action={dislikeUser}
            title={intl.formatMessage(messages.usersLiked)}
            actionMessage={intl.formatMessage(messages.dislikeUser)}
          />
        )}
      </Grid>
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
    </Grid>
  );
};

export default MyUser;
