import React from 'react';
import { Drawer as MDrawer, Box } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import { useConnect } from './hooks';

const Drawer = ({ isDrawerOpen, toggleDrawer }) => {
  const { handleFilter, filter } = useConnect();
  return (
    <MDrawer
      data-testid="drawer"
      open={isDrawerOpen}
      onClose={() => toggleDrawer(false)}
    >
      <Box p={3} width={300}>
        <UserForm id="drawer" initialValues={filter} submit={handleFilter} />
      </Box>
    </MDrawer>
  );
};

export default Drawer;
