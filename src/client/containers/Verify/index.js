import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { usersPath } from '../../utils';
import { useConnect } from './hooks';

const payload = { emailVerified: true };

const Verify = () => {
  const { isAuthEmpty, updateUser } = useConnect();
  useEffect(() => {
    updateUser(payload);
  }, [updateUser]);
  if (!isAuthEmpty) return <Redirect to={usersPath} />;
  return false;
};

export default Verify;
