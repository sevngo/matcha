import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Hidden, Box, TablePagination, Paper } from '@material-ui/core';
import { isEmpty } from 'ramda';
import UserCards from '../../components/UserCards';
import { handleFilter, loadUsers } from '../../actions';
import { getUsers, getUsersTotal, getFilter } from '../../selectors/users';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const total = useSelector(getUsersTotal);
  const filter = useSelector(getFilter);
  useEffect(() => {
    dispatch(
      handleFilter({
        gender: 'male',
        maxDistance: 20000,
        ageRange: [18, 50],
        sortBy: 'distance:asc',
        limit: 10,
        skip: 0,
      })
    );
  }, [dispatch]);
  useEffect(() => {
    if (!isEmpty(filter)) dispatch(loadUsers(filter));
  }, [dispatch, filter]);
  const { limit } = filter;
  const [page, setPage] = useState(0);
  const handleChangePage = (event, page) => {
    dispatch(handleFilter({ skip: limit * page }));
    setPage(page);
  };
  const handleChangeRowsPerPage = (event) => {
    dispatch(handleFilter({ limit: event.target.value }));
    setPage(0);
  };
  return (
    <Fragment>
      <Paper elevation={1}>
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
      <Box mb={2} />
      <UserCards users={users} />
    </Fragment>
  );
};

export default Users;
