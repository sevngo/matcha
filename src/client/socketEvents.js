import { path, isEmpty } from 'ramda';
import io from 'socket.io-client';
import store from './store';
import { GOT_FRIENDED, GOT_UNDFRIENDED, ADD_NOTIFICATION } from './actions';
import { getAuth } from './selectors';

const socket = io(process.env.REACT_APP_API_URL); // logic to be changed for production environment

socket.on('connect', () => {
  const state = store.getState();
  const auth = getAuth(state);
  if (!isEmpty(auth)) socket.emit('reLogged', auth._id);
});

socket.on('friendLogged', notification => {
  store.dispatch({
    type: ADD_NOTIFICATION,
    notification: { ...notification, messageId: 'friendLogged' },
  });
});

socket.on('gotLiked', notification => {
  store.dispatch({
    type: ADD_NOTIFICATION,
    notification: { ...notification, messageId: 'gotLiked' },
  });
});

socket.on('gotBlocked', notification => {
  store.dispatch({
    type: ADD_NOTIFICATION,
    notification: { ...notification, messageId: 'gotBlocked' },
  });
});

socket.on('gotFriended', notification => {
  store.dispatch({ type: GOT_FRIENDED, user: notification.user });
  store.dispatch({
    type: ADD_NOTIFICATION,
    notification: { ...notification, messageId: 'gotFriended' },
  });
});

socket.on('gotUnfriended', notification => {
  store.dispatch({ type: GOT_UNDFRIENDED, _id: path(['user', '_id'])(notification) });
  store.dispatch({
    type: ADD_NOTIFICATION,
    notification: { ...notification, messageId: 'gotUnfriended' },
  });
});

export default socket;
