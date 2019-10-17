import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducer from './reducers';

const initialState = {
  myUser: {
    // token: 'abc',
    // notifications: [
    //   {
    //     user: {
    //       _id: '5caf003feaca23291c0cec34',
    //       username: 'qweqwe',
    //     },
    //     createdAt: '2019-05-31T14:26:56.395Z',
    //     _id: '5cf139b0ac67827a50ec70e5',
    //     messageId: 'friendLogged',
    //   },
    //   {
    //     user: {
    //       _id: '5caf003feaca23291c0cec34',
    //       username: 'qweqwe',
    //     },
    //     createdAt: '2019-05-31T14:26:56.395Z',
    //     _id: '5cf139b0as67827a50ec70e5',
    //     messageId: 'gotUnfriended',
    //   },
    // ],
  },
  app: {},
  users: {
    data: [],
    filter: {
      gender: 'male',
      interests: [],
      maxDistance: 20000,
      ageRange: [18, 50],
      sortBy: 'popularity:desc',
    },
    user: {},
  },
  snackbar: {},
};

export default createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
