import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducer from './reducers';
import { loadState, saveState } from './utils';
import { getAuth } from './selectors';

const initialState = {
  auth: {},
  app: {},
  users: {
    data: [],
    total: 0,
    filter: {
      gender: 'male',
      interests: [],
      maxDistance: 20000,
      ageRange: [18, 50],
      sortBy: 'popularity:desc',
      limit: 10,
      skip: 0,
    },
  },
  user: {},
  snackbar: {},
};

const persistedState = loadState();

const store = createStore(
  reducer,
  { ...initialState, ...persistedState },
  composeWithDevTools(applyMiddleware(thunk)),
);

store.subscribe(() => {
  const state = store.getState();
  const auth = getAuth(state);
  saveState({ auth });
});

export default store;
