import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducer from './reducers';

const initialState = {
  // auth: {
  //   _id: '5ca7a8e6485d2a0e845260f4',
  //   username: 'asdasd',
  //   email: 'asdasd@asdasd.fr',
  //   firstName: 'asdasd',
  //   lastName: 'asdasd',
  //   gender: 'male',
  //   birthDate: '2000-04-01',
  //   address: {
  //     name: 'Paris, France',
  //     type: 'Point',
  //     coordinates: [2.35222190000002, 48.856614],
  //   },
  //   usersLiked: [],
  //   usersBlocked: [],
  //   token:
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2E3YThlNjQ4NWQyYTBlODQ1MjYwZjQiLCJpYXQiOjE1NTY3MTc5MDd9.VAjTjSsVoG95-p0bVIjgTlasuHQK60pGfUUWsFJoikM',
  // },
  app: { snackbars: [] },
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
