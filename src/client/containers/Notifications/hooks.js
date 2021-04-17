import { useSelector, useDispatch } from 'react-redux';
import { deleteNotification } from '../../actions/auth';
import {
  getAuthNotifications,
  getAuthNotificationsLength,
} from '../../selectors/auth';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    notifications: useSelector(getAuthNotifications),
    notificationsLength: useSelector(getAuthNotificationsLength),
    deleteNotification: (notificationId) =>
      dispatch(deleteNotification(notificationId)),
  };
};
