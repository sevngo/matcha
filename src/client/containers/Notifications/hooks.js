import { useSelector, useDispatch } from 'react-redux';
import { deleteNotification } from '../../store/auth/actions';
import {
  getAuthNotifications,
  getAuthNotificationsLength,
} from '../../store/auth/selectors';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    notifications: useSelector(getAuthNotifications),
    notificationsLength: useSelector(getAuthNotificationsLength),
    deleteNotification: (notificationId) =>
      dispatch(deleteNotification(notificationId)),
  };
};
