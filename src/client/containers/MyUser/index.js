import React, { useRef, useState, Fragment } from 'react';
import { length, isEmpty, path, map, pick } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Grid, Button, Typography, Icon, Divider, Box } from '@material-ui/core';
import Paper from '../../components/Paper';
import UserForm from '../../components/UserForm';
import Carousel from '../../components/Carousel';
import Modal from '../../components/Modal';
import { getUserImage } from '../../api';
import { compact } from '../../utils';
import emptyImage from '../../images/emptyImage.png';
import { useAuth } from '../../hooks';
import useStyles from './styles';
import messages from './messages';

const MyUser = () => {
  const classes = useStyles();
  const { auth, updateUser, uploadImage, removeImage, likeUser } = useAuth();
  const [activeStep, handleStep] = useState(0);
  const [isModalOpen, handleModal] = useState(false);
  const { _id, token, images = [], usersBlocked } = auth;
  const inputEl = useRef();
  const addImage = image => {
    if (image) uploadImage(token, image);
  };
  const image = !isEmpty(images)
    ? getUserImage(_id, path([activeStep, '_id'])(images))
    : emptyImage;
  const maxSteps = length(images);
  const userForm = pick(['username', 'birthDate', 'email', 'gender', 'address'])(auth);
  return (
    <Box p={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.mw30}>
          <Carousel activeStep={activeStep} maxSteps={maxSteps} handleStep={handleStep}>
            <Box p={1} bgcolor="background.default">
              <input
                ref={inputEl}
                type="file"
                onChange={event => addImage(event.target.files[0])}
                accept="image/png, image/jpeg"
                className={classes.hide}
              />
              <Button
                variant="outlined"
                onClick={() => handleModal(true)}
                disabled={!images || isEmpty(images)}
              >
                <FormattedMessage {...messages.delete} />
                <Icon className={classes.ml1}>delete</Icon>
              </Button>
              <Modal
                open={isModalOpen}
                onClose={() => handleModal(false)}
                title={<FormattedMessage {...messages.sure} />}
                actions={
                  <Fragment>
                    <Button size="small" onClick={() => handleModal(false)}>
                      <FormattedMessage {...messages.no} />
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        removeImage(token, path([activeStep, '_id'])(images));
                        handleStep(0);
                        handleModal(false);
                      }}
                    >
                      <FormattedMessage {...messages.yes} />
                    </Button>
                  </Fragment>
                }
              />
              <Button
                variant="outlined"
                onClick={() => inputEl.current.click()}
                disabled={length(images) === 5}
                className={classes.ml1}
              >
                <FormattedMessage {...messages.upload} />
                <Icon className={classes.ml1}>cloud_upload</Icon>
              </Button>
            </Box>
            <img className={classes.img} src={image} alt="profile" />
          </Carousel>
        </Grid>
        <Grid item xs={12} className={classes.mw30}>
          <Paper className={classes.p3}>
            <UserForm
              initialValues={{
                ...userForm,
                newPassword: '',
              }}
              submit={user => updateUser(token, compact(user))}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} className={classes.mw30}>
          {usersBlocked[0] && (
            <Paper className={classes.p3}>
              <Typography variant="h5">
                <FormattedMessage {...messages.usersBlocked} />
              </Typography>
              <Divider className={classes.mt1} />
              {map(user => (
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
                    onClick={() => likeUser(auth, user._id)}
                    className={classes.like}
                  >
                    <FormattedMessage {...messages.likeUser} />
                  </Button>
                </Grid>
              ))(usersBlocked)}
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyUser;
