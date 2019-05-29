import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'ramda';
import { getMyUser } from '../selectors';

const withoutAuth = Component => {
  const EnhancedComponent = props =>
    isEmpty(props.myUser) ? <Component {...props} /> : <Redirect to="/" />;
  const mapStateToProps = createStructuredSelector({ myUser: getMyUser });
  return connect(mapStateToProps)(EnhancedComponent);
};

export default withoutAuth;
