import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  TablePagination,
  Paper,
  IconButton,
  Typography,
} from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import { FormattedMessage } from 'react-intl';
import UserCards from '../../components/UserCards';
import ScrollToTop from '../../components/ScrollToTop';
import Drawer from '../Drawer';
import { handleFilter, loadUsers } from '../../store/users/actions';
import {
  getUsersData,
  getUsersTotal,
  getUsersFilter,
} from '../../store/users/selectors';
import useStyles from './styles';
import messages from './messages';

const Users = () => {
  const classes = useStyles();
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
      <Paper elevation={1} className={classes.paper} data-testid="users">
        <IconButton
          data-testid="openDrawer"
          color="inherit"
          onClick={() => toggleDrawer(true)}
        >
          <SortIcon />
          <Typography className={classes.filter}>
            <FormattedMessage {...messages.filter} />
          </Typography>
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
