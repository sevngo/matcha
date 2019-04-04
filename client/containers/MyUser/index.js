import React, { useRef, useState } from 'react';
import { compose, length, isEmpty, path } from 'ramda';
import { connect } from 'react-redux';
import { withStyles, Paper, Grid } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import Carousel from '../../components/Carousel';
import Icon from '../../components/Icon';
import { updateAccount, addImage, removeImage } from '../../actions';
import { getAuth } from '../../selectors';
import styles from './styles';

const Component = ({ classes, auth, updateAccount, addImage, removeImage }) => {
  const { _id, token, images } = auth;
  const [activeStep, handleStep] = useState(0);
  const inputEl = useRef(null);
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
          <Icon
            color="inherit"
            onClick={() => {
              removeImage(token, _id, path([activeStep, '_id'])(images));
              handleStep(0);
            }}
            disabled={!images || isEmpty(images)}
          >
            delete
          </Icon>
          <Icon
            onClick={() => inputEl.current.click()}
            color="inherit"
            disabled={length(images) === 5}
          >
            add_a_photo
          </Icon>
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

const mapStateToProps = state => ({
  auth: getAuth(state),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { updateAccount, addImage, removeImage },
  ),
)(Component);
