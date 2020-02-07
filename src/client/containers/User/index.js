import React from 'react';
import { useParams } from 'react-router';
import MyUser from '../MyUser';
import OtherUser from '../OtherUser';
import { useAuth } from '../../hooks';

const User = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  if (id === auth._id) return <MyUser />;
  return <OtherUser id={id} />;
};

export default User;
