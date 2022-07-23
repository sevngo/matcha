import SortIcon from '@mui/icons-material/Sort';
import {
  Box,
  IconButton,
  Paper,
  TablePagination,
  Typography,
} from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTop from '../../components/ScrollToTop';
import UserCards from '../../components/UserCards';
import { handleFilter, loadUsers } from '../../store/users/actions';
import {
  getUsersData,
  getUsersFilter,
  getUsersTotal,
} from '../../store/users/selectors';
import Drawer from '../Drawer';
import messages from './messages';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUsersData);
  const total = useSelector(getUsersTotal);
  const filter = useSelector(getUsersFilter);
  useEffect(() => {
    return () => dispatch(handleFilter({ skip: 0 }));
  }, [dispatch]);
  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch, filter]);
  const [page, setPage] = useState(0);
  const [isDrawerOpen, toggleDrawer] = useState(false);
  const { limit } = filter;
  const handleChangePage = (event, page) => {
    dispatch(handleFilter({ skip: limit * page }));
    setPage(page);
  };
  const handleChangeRowsPerPage = (event) => {
    dispatch(handleFilter({ limit: event.target.value, skip: 0 }));
    setPage(0);
  };
  return (
    <Fragment>
      <Paper
        elevation={1}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <IconButton
          data-testid="openDrawer"
          color="inherit"
          onClick={() => toggleDrawer(true)}
          size="large"
        >
          <SortIcon />
          <Typography sx={{ ml: 1.5 }}>
            <FormattedMessage {...messages.filter} />
          </Typography>
        </IconButton>
        <TablePagination
          component="div"
          rowsPerPage={limit}
          rowsPerPageOptions={[10, 25, 100]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          count={total}
          onPageChange={handleChangePage}
          page={page}
          SelectProps={{ inputProps: { 'data-testid': 'rowsSelect' } }}
        />
      </Paper>
      <Box mb={2} />
      {users[0] && <UserCards users={users} />}
      <Drawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <ScrollToTop />
    </Fragment>
  );
};

export default Users;
