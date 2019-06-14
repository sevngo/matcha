import React, { useEffect } from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Cards from '../../components/Cards';
import withAuth from '../../hoc/withAuth';
import { getUsers, getMyUser, getFilter } from '../../selectors';
import { loadUsers } from '../../actions';
import useStyles from './styles';

const Users = ({ users, loadUsers, myUser: { token }, filter }) => {
  const classes = useStyles();
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
  connect(
    mapStateToProps,
    { loadUsers },
  ),
)(Users);
