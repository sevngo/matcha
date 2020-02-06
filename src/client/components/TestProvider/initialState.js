export default {
  auth: {
    usersLiked: [],
    usersBlocked: [{ _id: 'id' }],
    friends: {},
  },
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
};
