import { path } from 'ramda';
import store from './store';
import { GOT_FRIENDED, GOT_UNDFRIENDED, ADD_NOTIFICATION } from './actions';

const socketEvents = socket => {
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
  socket.on('gotVisited', notification => {
    store.dispatch({
      type: ADD_NOTIFICATION,
      notification: { ...notification, messageId: 'gotVisited' },
    });
  });
};

export default socketEvents;
