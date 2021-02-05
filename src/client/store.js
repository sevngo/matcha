import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { loadState, saveState } from './utils';
import { getAuth } from './selectors/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadState();

const initialState = {
  users: {
    filter: {
      gender: 'male',
      maxDistance: 20000,
      ageRange: [18, 50],
      sortBy: 'distance:asc',
      limit: 10,
      skip: 0,
    },
  },
  ...persistedState,
};

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  const state = store.getState();
  const auth = getAuth(state);
  saveState({ auth });
});

export default store;
