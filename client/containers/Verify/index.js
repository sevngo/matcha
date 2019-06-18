import { useEffect } from 'react';
import { compose } from 'ramda';
import withoutAuth from '../../hoc/withoutAuth';
import { useMyDispatch } from '../../hooks';

const Reset = ({
  match: {
    params: { token },
  },
}) => {
  const { updateUser } = useMyDispatch();
  useEffect(() => {
    updateUser({ token, emailVerified: true });
  }, []);
  return false;
};

export default compose(withoutAuth)(Reset);
