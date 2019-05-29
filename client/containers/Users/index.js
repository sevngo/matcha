import React, { useEffect } from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core';
import Cards from '../../components/Cards';
import withAuth from '../../hoc/withAuth';
import { getUsers, getMyUser, getFilter } from '../../selectors';
import { loadUsers } from '../../actions';
import styles from './styles';

const Users = ({ classes, users, loadUsers, myUser: { token }, filter }) => {
  useEffect(() => {
    loadUsers(token, filter);
  }, [filter]);
  return (
    <div className={classes.root}>
      <Cards users={users} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  myUser: getMyUser,
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
