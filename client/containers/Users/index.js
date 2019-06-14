import React, { useEffect } from 'react';
import { compose } from 'ramda';
import { connect, useSelector } from 'react-redux';
import Cards from '../../components/Cards';
import withAuth from '../../hoc/withAuth';
import { getUsers, getToken, getFilter } from '../../selectors';
import { loadUsers } from '../../actions';
import useStyles from './styles';

const Users = ({ loadUsers }) => {
  const token = useSelector(getToken);
  const users = useSelector(getUsers);
  const filter = useSelector(getFilter);
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

export default compose(
  withAuth,
  connect(
    null,
    { loadUsers },
  ),
)(Users);
