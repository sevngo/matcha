const { project } = require('../utils/stages');

exports.otherUserProjection = project({
  _id: 1,
  username: 1,
  firstName: 1,
  lastName: 1,
  gender: 1,
  birthDate: 1,
  'address.name': 1,
  'images._id': 1,
  interests: 1,
  biography: 1,
  distance: 1,
});

exports.myUserProjection = project({
  _id: 1,
  username: 1,
  firstName: 1,
  lastName: 1,
  gender: 1,
  address: 1,
  'images._id': 1,
  interests: 1,
  biography: 1,
  'usersBlocked._id': 1,
  'usersBlocked.username': 1,
  'usersLiked._id': 1,
});

exports.friendsProjection = project({
  _id: 1,
});

exports.imageProjection = project({ 'images._id': 1 });
