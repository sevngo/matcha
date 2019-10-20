import React, { useRef, useState, Fragment } from 'react';
import { length, isEmpty, path, map, pick } from 'ramda';
import { FormattedMessage } from 'react-intl';
import { Paper, Grid, Button, Typography, Icon, Divider } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import Carousel from '../../components/Carousel';
import Modal from '../../components/Modal';
import { getUserImage } from '../../api';
import emptyImage from '../../images/emptyImage.png';
import { useConnect } from './hooks';
import useStyles from './styles';
import messages from './messages';

const MyUser = () => {
  const classes = useStyles();
  const { myUser, updateUser, uploadImage, removeImage, likeUser } = useConnect();
  const [activeStep, handleStep] = useState(0);
  const [isModalOpen, handleModal] = useState(false);
  const { _id, token, images = [], usersBlocked } = myUser;
  const inputEl = useRef();
  const addImage = image => {
    if (image) uploadImage(token, image);
  };
  const image = !isEmpty(images)
    ? getUserImage(_id, path([activeStep, '_id'])(images))
    : emptyImage;
  const maxSteps = length(images);
  const userForm = pick([
    'username',
    'birthDate',
    'firstName',
    'lastName',
    'email',
    'gender',
    'address',
    'interests',
    'biography',
    'token',
  ])(myUser);
  return (
    <Grid container spacing={3} justify="center" direction="row" className={classes.p3}>
      <Grid item className={classes.width}>
        <Carousel activeStep={activeStep} maxSteps={maxSteps} handleStep={handleStep}>
          <div className={classes.header}>
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
              title={messages.sure}
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
                      handleModal(true);
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
          </div>
          <img className={classes.img} src={image} alt="image" />
        </Carousel>
        {usersBlocked[0] && (
          <Paper elevation={24} className={classes.usersBlocked}>
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
                  onClick={() => likeUser(myUser, user._id)}
                  className={classes.like}
                >
                  <FormattedMessage {...messages.likeUser} />
                </Button>
              </Grid>
            ))(usersBlocked)}
          </Paper>
        )}
      </Grid>
      <Grid item className={classes.width}>
        <Paper elevation={24} className={classes.p3}>
          <UserForm
            initialValues={{
              interests: [],
              biography: '',
              ...userForm,
              newPassword: '',
            }}
            newPassword
            submit={updateUser}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MyUser;
