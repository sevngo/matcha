import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { compose } from 'ramda';
import Cards from '../../components/Cards';
import withAuth from '../../hoc/withAuth';
import { useMyDispatch } from '../../hooks';
import useStyles from './styles';
import { getToken, getUsers, getFilter } from '../../selectors';

const Users = () => {
  const token = useSelector(getToken);
  const users = useSelector(getUsers);
  const filter = useSelector(getFilter);
  const { loadUsers } = useMyDispatch();
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

export default compose(withAuth)(Users);
