import { useDispatch, useSelector } from 'react-redux';
import { removeNotification } from '../../actions';
import { getNotifications } from '../../selectors';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    notifications: useSelector(getNotifications),
    removeNotification: _id => dispatch(removeNotification(_id)),
  };
};
