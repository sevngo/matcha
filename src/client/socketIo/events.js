import { isEmpty } from 'ramda';
import store from '../store';
import {
  GOT_FRIENDED,
  GOT_UNDFRIENDED,
  ADD_NOTIFICATION,
} from '../store/auth/actions';
import { getAuth } from '../store/auth/selectors';

const socketEvents = (socket) => {
  socket.on('connect', () => {
    const state = store.getState();
    const auth = getAuth(state);
    if (!isEmpty(auth)) socket.emit('logged', auth._id);
  });

  socket.on('notification', (notification) => {
    store.dispatch({
      type: ADD_NOTIFICATION,
      notification,
    });
    if (notification.event === 'gotFriended')
      return store.dispatch({ type: GOT_FRIENDED, user: notification.user });
    if (notification.event === 'gotUnfriended')
      return store.dispatch({
        type: GOT_UNDFRIENDED,
        _id: notification.user?._id,
      });
  });
};

export default socketEvents;
