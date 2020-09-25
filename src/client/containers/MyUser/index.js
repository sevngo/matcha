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
    <Grid container justify="center" spacing={2}>
      <Grow in={true} timeout={200}>
        <Grid item>
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
                <IconButton onClick={() => inputEl.current.click()}>
                  <CloudUpload color="primary" />
                </IconButton>
              </Fragment>
            }
          />
        </Grid>
      </Grow>
      <Grow in={true} timeout={400}>
        <Grid item xs className={classes.mw30}>
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
      {usersBlocked[0] && (
        <Grow in={true} timeout={600}>
          <Grid item xs className={classes.mw30}>
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
                    className={classes.like}
                  >
                    <FormattedMessage {...messages.likeUser} />
                  </Button>
                </Grid>
              ))(usersBlocked)}
            </Paper>
          </Grid>
        </Grow>
      )}
    </Grid>
  );
};

export default MyUser;
