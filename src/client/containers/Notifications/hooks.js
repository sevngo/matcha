import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../../actions';
import {
  getAuthNotifications,
  getAuthNotificationsLength,
} from '../../selectors';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    notifications: useSelector(getAuthNotifications),
    notificationsLength: useSelector(getAuthNotificationsLength),
    removeNotification: (notificationId) =>
      dispatch(removeNotification(notificationId)),
  };
};
