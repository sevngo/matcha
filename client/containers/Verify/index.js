import { useEffect } from 'react';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import withoutAuth from '../../hoc/withoutAuth';
import { updateUser } from '../../actions/myUser';

const Reset = ({
  match: {
    params: { token },
  },
  updateUser,
}) => {
  useEffect(() => {
    updateUser({ token, emailVerified: true });
  }, []);
  return false;
};

export default compose(
  connect(
    null,
    { updateUser },
  ),
  withoutAuth,
)(Reset);
