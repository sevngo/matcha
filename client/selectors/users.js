import {
  prop,
  path,
  filter as rFilter,
  compose,
  intersection,
  length,
  reject,
  propEq,
} from 'ramda';
import { createSelector } from 'reselect';

const root = prop('users');

export const getFilter = path(['users', 'filter']);
// export const getFilter = createSelector(root, prop('filter'));

export const getUsers = id =>
  createSelector(
    root,
    compose(
      reject(user => propEq('_id', id)(user)),
      prop('data'),
    ),
  );

export const getUser = createSelector(
  root,
  prop('user'),
);

// export const getUsersFiltered = createSelector(
//   getUsers,
//   getFilter,
//   (users, filter) =>
//     compose(
//       rFilter(
//         user => length(intersection(filter.interests)(user.interests)) === length(filter.interests),
//       ),
//       rFilter(propEq('gender', filter.gender)),
//     )(users),
// );
