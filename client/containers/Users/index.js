import React, { useEffect } from 'react';
import { compose } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import Cards from '../../components/Cards';
import withAuth from '../../hoc/withAuth';
import { getUsers, getToken, getFilter } from '../../selectors';
import { loadUsers } from '../../actions';
import useStyles from './styles';

const Users = () => {
  const token = useSelector(getToken);
  const users = useSelector(getUsers);
  const filter = useSelector(getFilter);
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUsers(token, filter));
  }, [filter]);
  return (
    <div className={classes.root}>
      <Cards users={users} />
    </div>
  );
};

export default compose(withAuth)(Users);
