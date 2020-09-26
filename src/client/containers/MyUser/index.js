import React, { Fragment, useRef } from 'react';
import { map, pick } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  Grid,
  Button,
  Typography,
  Divider,
  Paper,
  Grow,
  IconButton,
  Box,
  Tooltip,
} from '@material-ui/core';
import CloudUpload from '@material-ui/icons/CloudUpload';
import UserForm from '../../components/UserForm';
import { compact } from '../../utils';
import useStyles from './styles';
import messages from './messages';
import { getAuth, getUsersBlocked } from '../../selectors';
import { likeUser, uploadImage, updateUser } from '../../actions';
import UserCard from '../../components/UserCard';

const MyUser = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector(getAuth);
  const usersBlocked = useSelector(getUsersBlocked);
  const inputEl = useRef();
  const addImage = (image) => {
    if (image) dispatch(uploadImage(image));
  };
  const userForm = pick([
    'username',
    'birthDate',
    'email',
    'gender',
    'address',
  ])(auth);
  return (
    <Grid container spacing={2}>
      <Grow in={true} timeout={200}>
        <Grid item xs={12} sm={6} md={7}>
          <UserCard
            user={auth}
            actions={
              <Fragment>
                <input
                  ref={inputEl}
                  type="file"
                  onChange={(event) => addImage(event.target.files[0])}
                  accept="image/png, image/jpeg"
                  className={classes.hide}
                />
                <Tooltip title={<FormattedMessage {...messages.uploadImage} />}>
                  <IconButton onClick={() => inputEl.current.click()}>
                    <CloudUpload color="primary" />
                  </IconButton>
                </Tooltip>
              </Fragment>
            }
          />
          <Box m={2} />
          {usersBlocked[0] && (
            <Grow in={true} timeout={600}>
              <Paper elevation={1} className={classes.p3}>
                <Typography variant="subtitle1" className={classes.subtitle}>
                  <FormattedMessage {...messages.usersBlocked} />
                </Typography>
                <Divider className={classes.mt1} />
                {map((user) => (
                  <Grid
                    key={user._id}
                    container
                    justify="space-between"
                    alignItems="center"
                    className={classes.mt1}
                  >
                    <Typography>{user.username}</Typography>
                    <Button
                      variant="outlined"
                      onClick={() => dispatch(likeUser(user._id))}
                      color="primary"
                    >
                      <FormattedMessage {...messages.likeUser} />
                    </Button>
                  </Grid>
                ))(usersBlocked)}
              </Paper>
            </Grow>
          )}
        </Grid>
      </Grow>
      <Grow in={true} timeout={400}>
        <Grid item xs={12} sm={6} md={5}>
          <Paper elevation={1} className={classes.p3}>
            <UserForm
              initialValues={{
                ...userForm,
                password: '',
              }}
              submit={(user) => dispatch(updateUser(compact(user)))}
              newPasswordLabel
            />
          </Paper>
        </Grid>
      </Grow>
    </Grid>
  );
};

export default MyUser;
