import React, { useRef, useState } from 'react';
import { compose, length, isEmpty, path } from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { withStyles, Paper, Grid, Button, Typography, Icon } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import Carousel from '../../components/Carousel';
import Popover from '../../components/Popover';
import { updateUser, uploadImage, removeImage } from '../../actions';
import { getAuth } from '../../selectors';
import styles from './styles';
import messages from './messages';

const MyUser = ({ classes, auth, updateUser, uploadImage, removeImage }) => {
  const { _id, token, images } = auth;
  const [activeStep, handleStep] = useState(0);
  const [anchorEl, handlePopover] = useState();
  const inputEl = useRef();
  const addImage = image => {
    if (image) uploadImage(token, _id, image);
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
                    removeImage(token, _id, path([activeStep, '_id'])(images));
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
    { updateUser, uploadImage, removeImage },
  ),
)(MyUser);
