import React from 'react';
import { Drawer as MDrawer, Box } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import { useFilter } from '../../hooks';

const Drawer = ({ isDrawerOpen, toggleDrawer }) => {
  const { handleFilter, filter } = useFilter();
  return (
    <MDrawer
      open={isDrawerOpen}
      onClose={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <Box p={3} width={400}>
        <UserForm initialValues={filter} submit={handleFilter} />
      </Box>
    </MDrawer>
  );
};

export default Drawer;
