export const userProjection = {
  _id: 1,
  username: 1,
  gender: 1,
  birthDate: 1,
  'address.name': 1,
  'image._id': 1,
  distance: 1,
};

export const authProjection = {
  _id: 1,
  username: 1,
  gender: 1,
  address: 1,
  email: 1,
  birthDate: 1,
  'image._id': 1,
  'usersBlocked._id': 1,
  'usersBlocked.username': 1,
  'usersLiked._id': 1,
  'friends._id': 1,
};

export const imageProjection = {
  'image._id': 1,
};
