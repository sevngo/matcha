import React, { useEffect, useState } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { Hidden } from '@material-ui/core';
import Paper from '../../components/Paper';
import UserCards from '../../components/UserCards';
import { useConnect } from './hooks';
import useStyles from './styles';

const Users = () => {
  const { token, users, filter, loadUsers, total, handleFilter } = useConnect();
  const classes = useStyles();
  useEffect(() => {
    loadUsers(token, filter);
  }, [filter]);
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
    <div className={classes.root}>
      <Paper className={classes.mb3}>
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
    </div>
  );
};

export default Users;
