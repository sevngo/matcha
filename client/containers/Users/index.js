import React, { useEffect } from 'react';
import { compose } from 'ramda';
import Cards from '../../components/Cards';
import withAuth from '../../hoc/withAuth';
import { useConnect } from './hooks';
import useStyles from './styles';

const Users = () => {
  const { token, users, filter, loadUsers } = useConnect();
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
