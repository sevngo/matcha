import store from './store';
import { GOT_FRIENDED, GOT_UNDFRIENDED, ADD_NOTIFICATION } from './actions';

const socketEvents = socket => {
  socket.on('friendLogged', notification => {
    console.log('friendLogged', notification);
    store.dispatch({ type: ADD_NOTIFICATION, notification });
  });
  socket.on('gotLiked', user => console.log('gotLiked', user));
  socket.on('gotBlocked', user => console.log('gotBlocked', user));
  socket.on('gotFriended', user => {
    store.dispatch({ type: GOT_FRIENDED, user });
  });
  socket.on('gotUnfriended', user => {
    store.dispatch({ type: GOT_UNDFRIENDED, _id: user._id });
  });
  socket.on('gotVisited', user => console.log('gotVisited', user));
};

export default socketEvents;
