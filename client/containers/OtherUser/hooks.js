import { useSelector, useDispatch } from 'react-redux';
import { getUser, getMyUser } from '../../selectors';
import { loadUser, likeUser, blockUser } from '../../actions';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    user: useSelector(getUser),
    myUser: useSelector(getMyUser),
    loadUser: (myUser, id) => dispatch(loadUser(myUser, id)),
    likeUser: (account, userLikedId) => dispatch(likeUser(account, userLikedId)),
    blockUser: (account, userBlockedId) => dispatch(blockUser(account, userBlockedId)),
  };
};
