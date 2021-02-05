import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../../actions/auth';
import {
  getAuthNotifications,
  getAuthNotificationsLength,
} from '../../selectors/auth';

export const useConnect = () => {
  const dispatch = useDispatch();
  return {
    notifications: useSelector(getAuthNotifications),
    notificationsLength: useSelector(getAuthNotificationsLength),
    removeNotification: (notificationId) =>
      dispatch(removeNotification(notificationId)),
  };
};
