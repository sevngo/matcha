import React, { useEffect } from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core';
import Cards from '../../components/Cards';
import withAuth from '../../hoc/withAuth';
import { getUsers, getAuth, getFilter } from '../../selectors';
import { loadUsers } from '../../actions';
import styles from './styles';

const Users = ({
  classes,
  users,
  loadUsers,
  auth: {
    token,
    address: { coordinates },
  },
  filter,
}) => {
  useEffect(() => {
    loadUsers(token, filter, coordinates);
  }, [filter]);
  return (
    <div className={classes.root}>
      <Cards users={users} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  auth: getAuth,
  users: getUsers,
  filter: getFilter,
});

export default compose(
  withAuth,
  withStyles(styles),
  connect(
    mapStateToProps,
    { loadUsers },
  ),
)(Users);
