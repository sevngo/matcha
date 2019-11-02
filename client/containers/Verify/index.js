import { useEffect } from 'react';
import { useConnect } from './hooks';

const Reset = ({
  match: {
    params: { token },
  },
}) => {
  const { updateUser } = useConnect();
  useEffect(() => {
    updateUser(token, { emailVerified: true });
  }, []);
  return false;
};

export default Reset;
