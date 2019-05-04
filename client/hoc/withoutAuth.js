import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isEmpty } from 'ramda';
import Users from '../containers/Users';
import { getAuth } from '../selectors';

const withoutAuth = Component => {
  const EnhancedComponent = props => (isEmpty(props.auth) ? <Component {...props} /> : <Users />);
  const mapStateToProps = createStructuredSelector({ auth: getAuth });
  return connect(mapStateToProps)(EnhancedComponent);
};

export default withoutAuth;
