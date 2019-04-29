import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducer from './reducers';

const initialState = {
  app: { notifications: [] },
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
};

export default createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
