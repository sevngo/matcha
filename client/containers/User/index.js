import React, { useEffect, useRef } from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { withStyles, Paper, Grid } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import Carousel from '../../components/Carousel';
import Icon from '../../components/Icon';
import withAuth from '../../hoc/withAuth';
import { loadUser, updateAccount, addImage } from '../../actions';
import { getUser, getAuth } from '../../selectors';

const styles = theme => ({
  p3: {
    padding: theme.spacing(3),
  },
  width: {
    maxWidth: 500,
  },
  header: {
    backgroundColor: theme.palette.background.default,
  },
  hide: {
    display: 'none',
  },
});

const Component = ({
  user,
  classes,
  match: {
    params: { id },
  },
  loadUser,
  auth,
  updateAccount,
  addImage,
}) => {
  const isMyAccount = id === auth._id;
  const inputEl = useRef(null);
  useEffect(() => {
    if (!isMyAccount) loadUser(auth.token, id);
  }, []);
  return (
    <Grid container spacing={3} justify="center" direction="row" className={classes.p3}>
      <Grid item xs={12} md={6}>
        {isMyAccount && (
          <Paper square elevation={24} className={classes.header}>
            <input
              ref={inputEl}
              type="file"
              onChange={event => addImage(auth.token, auth._id, event.target.files[0])}
              accept="image/png, image/jpeg"
              className={classes.hide}
            />
            <Icon color="inherit">delete</Icon>
            <Icon onClick={() => inputEl.current.click()} color="inherit">
              add_a_photo
            </Icon>
          </Paper>
        )}
        <Paper elevation={24}>
          <Carousel images={user.images} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} className={classes.width}>
        <Paper elevation={24} className={classes.p3}>
          {isMyAccount ? (
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
          ) : (
            <UserForm initialValues={user} readOnly />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

Component.defaultProps = {
  user: {},
};

const mapStateToProps = state => ({
  user: getUser(state),
  auth: getAuth(state),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { loadUser, updateAccount, addImage },
  ),
  withAuth,
)(Component);
