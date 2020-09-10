import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, TablePagination, Paper, IconButton } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import UserCards from '../../components/UserCards';
import Drawer from '../Drawer';
import { handleFilter, loadUsers } from '../../actions';
import { getUsers, getUsersTotal, getFilter } from '../../selectors';
import useStyles from './styles';

const Users = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const total = useSelector(getUsersTotal);
  const filter = useSelector(getFilter);
  useEffect(() => {
    return () => dispatch(handleFilter({ skip: 0 }));
  }, [dispatch]);
  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch, filter]);
  const { limit } = filter;
  const [page, setPage] = useState(0);
  const handleChangePage = (event, page) => {
    dispatch(handleFilter({ skip: limit * page }));
    setPage(page);
  };
  const handleChangeRowsPerPage = (event) => {
    dispatch(handleFilter({ limit: event.target.value, skip: 0 }));
    setPage(0);
  };
  const [isDrawerOpen, toggleDrawer] = useState(false);
  return (
    <Fragment>
      <Paper elevation={1} className={classes.paper}>
        <IconButton color="inherit" onClick={() => toggleDrawer(true)}>
          <FilterListIcon />
        </IconButton>
        <TablePagination
          component="div"
          rowsPerPage={limit}
          rowsPerPageOptions={[10, 25, 100]}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          count={total}
          onChangePage={handleChangePage}
          page={page}
          classes={{ input: classes.displayNone }}
          className={classes.pagination}
        />
      </Paper>
      <Box mb={2} />
      <UserCards users={users} />
      <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </Fragment>
  );
};

export default Users;
