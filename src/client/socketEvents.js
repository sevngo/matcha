import { isEmpty } from 'ramda';
import io from 'socket.io-client';
import store from './store';
import {
  GOT_FRIENDED,
  GOT_UNDFRIENDED,
  ADD_NOTIFICATION,
} from './actions/auth';
import { getAuth } from './selectors/auth';

const ioUrl =
  process.env.NODE_ENV === 'production' ? null : process.env.REACT_APP_API_URL;
const socket = io(ioUrl);

socket.on('connect', () => {
  const state = store.getState();
  const auth = getAuth(state);
  if (!isEmpty(auth)) socket.emit('reLogged', auth._id);
});

socket.on('friendLogged', (notification) => {
  store.dispatch({
    type: ADD_NOTIFICATION,
    notification: { ...notification, messageId: 'friendLogged' },
  });
});

socket.on('gotLiked', (notification) => {
  store.dispatch({
    type: ADD_NOTIFICATION,
    notification: { ...notification, messageId: 'gotLiked' },
  });
});

socket.on('gotFriended', (notification) => {
  store.dispatch({ type: GOT_FRIENDED, user: notification.user });
  store.dispatch({
    type: ADD_NOTIFICATION,
    notification: { ...notification, messageId: 'gotFriended' },
  });
});

socket.on('gotUnfriended', (notification) => {
  store.dispatch({
    type: GOT_UNDFRIENDED,
    _id: notification.user?._id,
  });
  store.dispatch({
    type: ADD_NOTIFICATION,
    notification: { ...notification, messageId: 'gotUnfriended' },
  });
});

export default socket;
