import { path } from 'ramda';
import store from './store';
import { GOT_FRIENDED, GOT_UNDFRIENDED, ADD_NOTIFICATION } from './actions';

const socketEvents = socket => {
  socket.on('friendLogged', notification => {
    console.log('friendLogged', notification);
    store.dispatch({ type: ADD_NOTIFICATION, notification });
  });
  socket.on('gotLiked', notification => {
    console.log('gotLiked', notification);
    store.dispatch({ type: ADD_NOTIFICATION, notification });
  });
  socket.on('gotBlocked', notification => {
    console.log('gotBlocked', notification);
    store.dispatch({ type: ADD_NOTIFICATION, notification });
  });
  socket.on('gotFriended', notification => {
    store.dispatch({ type: GOT_FRIENDED, user: notification.user });
    store.dispatch({ type: ADD_NOTIFICATION, notification });
  });
  socket.on('gotUnfriended', notification => {
    store.dispatch({ type: GOT_UNDFRIENDED, _id: path(['user', '_id'])(notification) });
    store.dispatch({ type: ADD_NOTIFICATION, notification });
  });
  socket.on('gotVisited', notification => {
    console.log('gotVisited', notification);
    store.dispatch({ type: ADD_NOTIFICATION, notification });
  });
};

export default socketEvents;
