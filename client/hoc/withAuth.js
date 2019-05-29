import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { path } from 'ramda';
import Auth from '../containers/Auth';
import { getMyUser } from '../selectors';

const withAuth = Component => {
  const EnhancedComponent = props =>
    path(['myUser', 'token'])(props) ? <Component {...props} /> : <Auth />;
  const mapStateToProps = createStructuredSelector({ myUser: getMyUser });
  return connect(mapStateToProps)(EnhancedComponent);
};

export default withAuth;
