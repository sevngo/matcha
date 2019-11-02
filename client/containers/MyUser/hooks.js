import { useDispatch, useSelector } from 'react-redux';
import { updateUser, uploadImage, removeImage, likeUser } from '../../actions';
import { getMyUser } from '../../selectors';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    myUser: useSelector(getMyUser),
    updateUser: (token, user) => dispatch(updateUser(token, user)),
    uploadImage: (account, userLikedId) => dispatch(uploadImage(account, userLikedId)),
    removeImage: (token, imageId) => dispatch(removeImage(token, imageId)),
    likeUser: (account, userLikedId) => dispatch(likeUser(account, userLikedId)),
  };
};
