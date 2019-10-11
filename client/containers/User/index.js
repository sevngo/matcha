import React from 'react';
import { compose } from 'ramda';
import MyUser from '../MyUser';
import OtherUser from '../OtherUser';
import withAuth from '../../hoc/withAuth';
import { useConnect } from './hooks';

const User = ({
  match: {
    params: { id },
  },
}) => {
  const { myUser } = useConnect();
  if (id === myUser._id) return <MyUser />;
  return <OtherUser id={id} />;
};

export default compose(withAuth)(User);
