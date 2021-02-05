import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import MyUser from '../MyUser';
import OtherUser from '../OtherUser';
import { getAuthId } from '../../selectors/auth';

const User = () => {
  const { id } = useParams();
  const authId = useSelector(getAuthId);
  if (id === authId) return <MyUser />;
  return <OtherUser id={id} />;
};

export default User;
