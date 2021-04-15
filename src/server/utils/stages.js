import { is } from 'ramda';

export const match = (key, value) => {
  if (value)
    return {
      $match: { [key]: is(Array)(value) ? { $all: value } : value },
    };
};

export const matchIn = (key, value) => {
  if (value)
    return {
      $match: { [key]: { $in: value } },
    };
};

export const lookupUsersLiked = (cursor) =>
  cursor.lookup({
    from: 'users',
    localField: 'usersLiked',
    foreignField: '_id',
    as: 'usersLiked',
  });

export const lookupFriends = (cursor, usersLiked, _id) =>
  cursor.lookup({
    from: 'users',
    pipeline: [matchIn('_id', usersLiked), match('usersLiked', _id)],
    as: 'friends',
  });
