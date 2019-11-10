import { useSelector, useDispatch } from 'react-redux';
import { getUser, getAuth } from '../../selectors';
import { loadUser, likeUser, blockUser } from '../../actions';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    user: useSelector(getUser),
    auth: useSelector(getAuth),
    loadUser: (auth, id) => dispatch(loadUser(auth, id)),
    likeUser: (account, userLikedId) => dispatch(likeUser(account, userLikedId)),
    blockUser: (account, userBlockedId) => dispatch(blockUser(account, userBlockedId)),
  };
};
