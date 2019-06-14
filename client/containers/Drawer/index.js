import React from 'react';
import { compose } from 'ramda';
import { Drawer as MDrawer } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import { getFilter } from '../../selectors';
import { connect, useSelector } from 'react-redux';
import { handleFilter } from '../../actions';
import useStyles from './styles';

const Drawer = ({ handleFilter, isDrawerOpen, toggleDrawer }) => {
  const classes = useStyles();
  const filter = useSelector(getFilter);
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

export default compose(
  connect(
    null,
    { handleFilter },
  ),
)(Drawer);
