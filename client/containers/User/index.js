import React from 'react';
import MyUser from '../MyUser';
import OtherUser from '../OtherUser';
import { useConnect } from './hooks';

const User = ({
  match: {
    params: { id },
  },
}) => {
  const { auth } = useConnect();
  if (id === auth._id) return <MyUser />;
  return <OtherUser id={id} />;
};

export default User;
