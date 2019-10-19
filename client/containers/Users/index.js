import React, { useEffect } from 'react';
import UserCards from '../../components/UserCards';
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
      <UserCards users={users} />
    </div>
  );
};

export default Users;
