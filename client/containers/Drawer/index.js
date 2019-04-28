import React from 'react';
import { compose } from 'ramda';
import { withStyles, Drawer } from '@material-ui/core';
import UserForm from '../../components/UserForm';
import { createStructuredSelector } from 'reselect';
import { getFilter } from '../../selectors';
import { connect } from 'react-redux';
import { handleFilter } from '../../actions';
import styles from './styles';

const Component = ({ classes, filter, handleFilter, isDrawerOpen, toggleDrawer }) => {
  return (
    <Drawer
      open={isDrawerOpen}
      onClose={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <div className={classes.root}>
        <UserForm initialValues={filter} submit={handleFilter} />
      </div>
    </Drawer>
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
)(Component);
