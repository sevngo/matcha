import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { usersPath } from '../../utils';

const Reset = () => {
  const { token } = useParams();
  const { updateUser } = useAuth();
  useEffect(() => {
    updateUser(token, { emailVerified: true });
  }, [token, updateUser]);
  return <Redirect to={usersPath} />;
};

export default Reset;
