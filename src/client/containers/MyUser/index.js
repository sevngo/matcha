import React, { useRef, useState, Fragment } from 'react';
import { length, isEmpty, path, map, pick } from 'ramda';
import { FormattedMessage } from 'react-intl';
import {
  Grid,
  Button,
  Typography,
  Divider,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Paper from '../../components/Paper';
import UserForm from '../../components/UserForm';
import Carousel from '../../components/Carousel';
import { getUserImage } from '../../api';
import { compact } from '../../utils';
import emptyImage from '../../images/emptyImage.png';
import { useAuth, useRelations, useImages, useToken } from '../../hooks';
import useStyles from './styles';
import messages from './messages';

const MyUser = () => {
  const classes = useStyles();
  const { auth, updateUser } = useAuth();
  const token = useToken();
  const { images, uploadImage, removeImage } = useImages();
  const { likeUser, usersBlocked } = useRelations();
  const [activeStep, handleStep] = useState(0);
  const [isDialogOpen, handleDialog] = useState(false);
  const { _id } = auth;
  const inputEl = useRef();
  const addImage = image => {
    if (image) uploadImage(image);
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
                onClick={() => handleDialog(true)}
                disabled={!images || isEmpty(images)}
              >
                <FormattedMessage {...messages.delete} />
                <DeleteIcon className={classes.ml1} />
              </Button>
              <Dialog open={isDialogOpen} onClose={() => handleDialog(false)}>
                <DialogTitle>
                  <FormattedMessage {...messages.sure} />
                </DialogTitle>
                <DialogActions>
                  <Fragment>
                    <Button size="small" onClick={() => handleDialog(false)}>
                      <FormattedMessage {...messages.no} />
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        removeImage(path([activeStep, '_id'])(images));
                        handleStep(0);
                        handleDialog(false);
                      }}
                    >
                      <FormattedMessage {...messages.yes} />
                    </Button>
                  </Fragment>
                </DialogActions>
              </Dialog>
              <Button
                variant="outlined"
                onClick={() => inputEl.current.click()}
                disabled={length(images) === 5}
                className={classes.ml1}
              >
                <FormattedMessage {...messages.upload} />
                <CloudUpload className={classes.ml1} />
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
                    onClick={() => likeUser(user._id)}
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
