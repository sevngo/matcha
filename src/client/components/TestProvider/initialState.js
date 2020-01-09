export default {
  auth: {
    usersLiked: [],
    usersBlocked: [{ _id: 'id' }],
    friends: {},
  },
  users: {
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
};
