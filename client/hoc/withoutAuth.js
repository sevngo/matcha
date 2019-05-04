import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'ramda';
import { getAuth } from '../selectors';

const withoutAuth = Component => {
  const EnhancedComponent = props =>
    isEmpty(props.auth) ? <Component {...props} /> : <Redirect to="/users" />;
  const mapStateToProps = createStructuredSelector({ auth: getAuth });
  return connect(mapStateToProps)(EnhancedComponent);
};

export default withoutAuth;
