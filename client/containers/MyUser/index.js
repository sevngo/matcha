import React, { useRef, useState } from 'react';
import { compose, length, isEmpty, path } from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { withStyles, Paper, Grid, Button, Typography, Icon } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import Carousel from '../../components/Carousel';
import Popover from '../../components/Popover';
import { updateAccount, addImage, removeImage } from '../../actions';
import { getAuth } from '../../selectors';
import styles from './styles';

const Component = ({ classes, auth, updateAccount, addImage, removeImage }) => {
  const { _id, token, images } = auth;
  const [activeStep, handleStep] = useState(0);
  const [anchorEl, handlePopover] = useState();
  const inputEl = useRef();
  const uploadImage = image => {
    if (image) addImage(token, _id, image);
  };
  return (
    <Grid container spacing={3} justify="center" direction="row" className={classes.p3}>
      <Grid item className={classes.width}>
        <Paper square elevation={24} className={classes.header}>
          <input
            ref={inputEl}
            type="file"
            onChange={event => uploadImage(event.target.files[0])}
            accept="image/png, image/jpeg"
            className={classes.hide}
          />
          <Button
            variant="outlined"
            onClick={event => handlePopover(event.currentTarget)}
            disabled={!images || isEmpty(images)}
          >
            <FormattedMessage id="containers.myUser.delete" />
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
                <FormattedMessage id="containers.myUser.sure" />
              </Typography>
            </Grid>
            <Grid container justify="flex-end">
              <Button size="small" onClick={() => handlePopover()}>
                <FormattedMessage id="containers.myUser.no" />
              </Button>
              <Button
                size="small"
                onClick={() => {
                  removeImage(token, _id, path([activeStep, '_id'])(images));
                  handleStep(0);
                  handlePopover();
                }}
              >
                <FormattedMessage id="containers.myUser.yes" />
              </Button>
            </Grid>
          </Popover>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => inputEl.current.click()}
            disabled={length(images) === 5}
            className={classes.ml1}
          >
            <FormattedMessage id="containers.myUser.upload" />
            <Icon className={classes.ml1}>cloud_upload</Icon>
          </Button>
        </Paper>
        <Paper elevation={24}>
          <Carousel userId={_id} images={images} activeStep={activeStep} handleStep={handleStep} />
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
            submit={updateAccount}
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
    { updateAccount, addImage, removeImage },
  ),
)(Component);
