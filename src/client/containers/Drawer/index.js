import React from 'react';
import { Drawer as MDrawer, Box } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import UserForm from '../../components/UserForm';
import { getFilter } from '../../selectors';
import { handleFilter } from '../../actions';

const Drawer = ({ isDrawerOpen, toggleDrawer }) => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  return (
    <MDrawer
      open={isDrawerOpen}
      onClose={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <Box p={3} width={300}>
        <UserForm
          initialValues={filter}
          submit={(values) => dispatch(handleFilter(values))}
        />
      </Box>
    </MDrawer>
  );
};

export default Drawer;
