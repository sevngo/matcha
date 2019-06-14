import React from 'react';
import { compose } from 'ramda';
import { Drawer as MDrawer } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import { createStructuredSelector } from 'reselect';
import { getFilter } from '../../selectors';
import { connect } from 'react-redux';
import { handleFilter } from '../../actions';
import useStyles from './styles';

const Drawer = ({ filter, handleFilter, isDrawerOpen, toggleDrawer }) => {
  const classes = useStyles();
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

const mapStateToProps = createStructuredSelector({
  filter: getFilter,
});

export default compose(
  connect(
    mapStateToProps,
    { handleFilter },
  ),
)(Drawer);
