import { useEffect } from 'react';
import { compose } from 'ramda';
import withoutAuth from '../../hoc/withoutAuth';
import { useConnect } from '../../hooks';

const Reset = ({
  match: {
    params: { token },
  },
}) => {
  const { updateUser } = useConnect();
  useEffect(() => {
    updateUser({ token, emailVerified: true });
  }, []);
  return false;
};

export default compose(withoutAuth)(Reset);
