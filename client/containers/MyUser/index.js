import React, { useRef, useState } from 'react';
import { compose, length, isEmpty, path, map } from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { withStyles, Paper, Grid, Button, Typography, Icon, Divider } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import Carousel from '../../components/Carousel';
import Popover from '../../components/Popover';
import { updateUser, uploadImage, removeImage, unblockUser } from '../../actions';
import { getAuth } from '../../selectors';
import styles from './styles';
import messages from './messages';

const MyUser = ({ classes, auth, updateUser, uploadImage, removeImage, unblockUser }) => {
  const { _id, token, images, usersBlocked } = auth;
  const [activeStep, handleStep] = useState(0);
  const [anchorEl, handlePopover] = useState();
  const inputEl = useRef();
  const addImage = image => {
    if (image) uploadImage(token, image);
  };
  return (
    <Grid container spacing={3} justify="center" direction="row" className={classes.p3}>
      <Grid item className={classes.width}>
        <Paper elevation={24}>
          <Carousel userId={_id} images={images} activeStep={activeStep} handleStep={handleStep}>
            <input
              ref={inputEl}
              type="file"
              onChange={event => addImage(event.target.files[0])}
              accept="image/png, image/jpeg"
              className={classes.hide}
            />
            <Button
              variant="outlined"
              onClick={event => handlePopover(event.currentTarget)}
              disabled={!images || isEmpty(images)}
            >
              <FormattedMessage {...messages.delete} />
              <Icon className={classes.ml1}>delete</Icon>
            </Button>
            <Popover
              id="simple-popper"
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => handlePopover()}
            >
              <Grid container>
                <Icon>info</Icon>
                <Typography variant="subtitle1" align="center" className={classes.ml1}>
                  <FormattedMessage {...messages.sure} />
                </Typography>
              </Grid>
              <Grid container justify="flex-end">
                <Button size="small" onClick={() => handlePopover()}>
                  <FormattedMessage {...messages.no} />
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    removeImage(token, path([activeStep, '_id'])(images));
                    handleStep(0);
                    handlePopover();
                  }}
                >
                  <FormattedMessage {...messages.yes} />
                </Button>
              </Grid>
            </Popover>
            <Button
              variant="outlined"
              onClick={() => inputEl.current.click()}
              disabled={length(images) === 5}
              className={classes.ml1}
            >
              <FormattedMessage {...messages.upload} />
              <Icon className={classes.ml1}>cloud_upload</Icon>
            </Button>
          </Carousel>
        </Paper>
        {usersBlocked[0] && (
          <Paper elevation={24} className={classes.usersBlocked}>
            <Typography variant="h5">Users blocked :</Typography>
            <Divider className={classes.mt1} />
            {map(user => (
              <Grid
                key={user._id}
                container
                justify="space-between"
                alignItems="center"
                className={classes.mt1}
              >
                <Typography>{user.firstName}</Typography>
                <Typography className={classes.ml1}>{user.lastName}</Typography>
                <Button
                  variant="outlined"
                  onClick={() => unblockUser(auth, user._id)}
                  className={classes.unblock}
                >
                  <FormattedMessage {...messages.unblockUser} />
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
              ...auth,
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

const mapStateToProps = createStructuredSelector({
  auth: getAuth,
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { updateUser, uploadImage, removeImage, unblockUser },
  ),
)(MyUser);
