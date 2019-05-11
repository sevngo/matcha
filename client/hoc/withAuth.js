import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { path } from 'ramda';
import Auth from '../containers/Auth';
import { getAuth } from '../selectors';

const withAuth = Component => {
  const EnhancedComponent = props =>
    path(['auth', 'token'])(props) ? <Component {...props} /> : <Auth />;
  const mapStateToProps = createStructuredSelector({ auth: getAuth });
  return connect(mapStateToProps)(EnhancedComponent);
};

export default withAuth;
