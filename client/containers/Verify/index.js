import { useEffect } from 'react';
import { compose } from 'ramda';
import { useDispatch } from 'react-redux';
import withoutAuth from '../../hoc/withoutAuth';
import { updateUser } from '../../actions/myUser';

const Reset = ({
  match: {
    params: { token },
  },
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateUser({ token, emailVerified: true }));
  }, []);
  return false;
};

export default compose(withoutAuth)(Reset);
