import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateUser } from '../../actions/auth';
import { usersPath } from '../../utils';
import { getAuthId } from '../../selectors/auth';

const Reset = () => {
  const { token } = useParams();
  const authId = useSelector(getAuthId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateUser(authId, { emailVerified: true }, token));
  }, [authId, token, dispatch]);
  return <Redirect to={usersPath} />;
};

export default Reset;
