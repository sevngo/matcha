import React from 'react';
import { compose } from 'ramda';
import { withStyles, Drawer as MDrawer } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import { createStructuredSelector } from 'reselect';
import { getFilter } from '../../selectors';
import { connect } from 'react-redux';
import { handleFilter } from '../../actions';
import styles from './styles';

const Drawer = ({ classes, filter, handleFilter, isDrawerOpen, toggleDrawer }) => {
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
  withStyles(styles),
)(Drawer);
