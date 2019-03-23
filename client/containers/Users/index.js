import React, { useEffect } from 'react';
import { compose, reject, propEq, not } from 'ramda';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Users from '../../components/Users';
import withAuth from '../../hoc/withAuth';
import { getUsers, getAuth } from '../../selectors';
import { loadUsers } from '../../actions';

const styles = theme => ({
  root: {
    padding: theme.spacing(3),
  },
});

const Component = ({ classes, users, loadUsers, auth: { _id } }) => {
  useEffect(() => {
    loadUsers();
  }, []);
  return (
    <div className={classes.root}>
      <Users users={users} />
    </div>
  );
};

Component.defaultProps = {
  users: [],
};

const mapStateToProps = (state, { auth: { _id } }) => ({
  auth: getAuth(state),
  users: getUsers(_id)(state),
});

export default compose(
  withAuth,
  withStyles(styles),
  connect(
    mapStateToProps,
    { loadUsers },
  ),
)(Component);
