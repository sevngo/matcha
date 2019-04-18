import React, { useEffect } from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Users from '../../components/Users';
import withAuth from '../../hoc/withAuth';
import { getUsers, getAuth, getFilter } from '../../selectors';
import { loadUsers } from '../../actions';

const styles = theme => ({
  root: {
    padding: theme.spacing(3),
  },
});

const Component = ({ classes, users, loadUsers, auth: { token }, filter }) => {
  useEffect(() => {
    loadUsers(token, filter);
  }, [filter]);
  return (
    <div className={classes.root}>
      <Users users={users} />
    </div>
  );
};

const mapStateToProps = (state, { auth: { _id } }) => ({
  auth: getAuth(state),
  users: getUsers(_id)(state),
  filter: getFilter(state),
});

export default compose(
  withAuth,
  withStyles(styles),
  connect(
    mapStateToProps,
    { loadUsers },
  ),
)(Component);
