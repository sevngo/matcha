import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import MyUser from '../MyUser';
import OtherUser from '../OtherUser';
import { getAuth } from '../../selectors';

const User = () => {
  const { id } = useParams();
  const auth = useSelector(getAuth);
  if (id === auth._id) return <MyUser />;
  return <OtherUser id={id} />;
};

export default User;
