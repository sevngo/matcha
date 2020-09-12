import { getAuth } from './selectors';
import { saveState } from './utils';
import store from './store';

store.subscribe(() => {
  const state = store.getState();
  const auth = getAuth(state);
  saveState({ auth });
});
