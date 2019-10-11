import React from 'react';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { isEmpty } from 'ramda';
import { getMyUser } from '../selectors';

const withoutAuth = Component => props => {
  const myUser = useSelector(getMyUser);
  isEmpty(myUser) ? <Component {...props} /> : <Redirect to="/" />;
};

export default withoutAuth;
