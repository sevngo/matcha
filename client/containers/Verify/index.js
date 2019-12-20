import { useEffect } from 'react';
import { useAuth } from '../../hooks';

const Reset = ({
  match: {
    params: { token },
  },
}) => {
  const { updateUser } = useAuth();
  useEffect(() => {
    updateUser(token, { emailVerified: true });
  }, []);
  return false;
};

export default Reset;
