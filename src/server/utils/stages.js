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
    pipeline: [
      {
        $match: { _id: { $in: usersLiked } },
      },
      {
        $match: { usersLiked: _id },
      },
    ],
    as: 'friends',
  });
