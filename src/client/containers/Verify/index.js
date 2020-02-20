import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateUser } from '../../actions';
import { usersPath } from '../../utils';

const Reset = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateUser(token, { emailVerified: true }));
  }, [token, dispatch]);
  return <Redirect to={usersPath} />;
};

export default Reset;
