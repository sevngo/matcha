import React, { useEffect, useState } from 'react';
import { Hidden, Box, TablePagination } from '@material-ui/core';
import Paper from '../../components/Paper';
import UserCards from '../../components/UserCards';
import { useUsers, useAuth, useFilter } from '../../hooks';
import useStyles from './styles';

const Users = () => {
  const { auth } = useAuth();
  const { users, loadUsers, total } = useUsers();
  const { filter, handleFilter } = useFilter();
  const classes = useStyles();
  const { token } = auth;
  useEffect(() => {
    loadUsers(token, filter);
  }, [filter, loadUsers, token]);
  const { limit } = filter;
  const [page, setPage] = useState(0);
  const handleChangePage = (event, page) => {
    handleFilter({ skip: limit * page });
    setPage(page);
  };
  const handleChangeRowsPerPage = event => {
    handleFilter({ limit: event.target.value });
    setPage(0);
  };
  return (
    <Box p={3}>
      <Paper className={classes.mb2}>
        <Hidden xsDown>
          <TablePagination
            component="div"
            rowsPerPage={limit}
            rowsPerPageOptions={[10, 25, 100]}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            count={total}
            onChangePage={handleChangePage}
            page={page}
          />
        </Hidden>
      </Paper>
      <UserCards users={users} />
    </Box>
  );
};

export default Users;
