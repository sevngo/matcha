import React from 'react';
import { useSelector } from 'react-redux';
import { Drawer as MDrawer } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import { getFilter } from '../../selectors';
import { useMyDispatch } from '../../hooks';
import useStyles from './styles';

const Drawer = ({ isDrawerOpen, toggleDrawer }) => {
  const classes = useStyles();
  const filter = useSelector(getFilter);
  const { handleFilter } = useMyDispatch();
  return (
    <MDrawer
      open={isDrawerOpen}
      onClose={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <div className={classes.root}>
        <UserForm initialValues={filter} submit={handleFilter} />
      </div>
    </MDrawer>
  );
};

export default Drawer;
