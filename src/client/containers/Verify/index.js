import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { usersPath } from '../../utils';
import { useConnect } from './hooks';

const payload = { emailVerified: true };

const Verify = () => {
  const { isAuthEmpty, updateUser } = useConnect();
  useEffect(() => {
    updateUser(payload);
  }, [updateUser]);
  if (!isAuthEmpty) return <Navigate to={usersPath} replace />;
  return false;
};

export default Verify;
