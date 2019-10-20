const { STRING, OBJECTID, DATE, BOOL, ARRAY, OBJECT, BINDATA } = require('../utils/constants');
const { USERS } = require('../utils/constants');

exports.usersModel = async db => {
  await db.createCollection(USERS);
  await db.collection(USERS).createIndex({ username: 1 }, { unique: true, sparse: true });
  await db.collection(USERS).createIndex({ email: 1 }, { unique: true, sparse: true });
  await db.collection(USERS).createIndex({ address: '2dsphere' });
  return db.command({
    collMod: USERS,
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'username',
          'birthDate',
          'firstName',
          'lastName',
          'email',
          'password',
          'gender',
          'address',
          'usersLikedIds',
          'usersBlockedIds',
        ],
        additionalProperties: false,
        properties: {
          _id: OBJECTID,
          username: STRING,
          birthDate: DATE,
          firstName: STRING,
          lastName: STRING,
          email: STRING,
          emailVerified: BOOL,
          password: STRING,
          gender: {
            enum: ['male', 'female'],
          },
          interests: ARRAY,
          biography: STRING,
          images: ARRAY,
          'images._id': OBJECTID,
          'images.data': BINDATA,
          address: OBJECT,
          'address.name': STRING,
          'address.type': STRING,
          'address.coordinates': ARRAY,
          usersLikedIds: ARRAY,
          usersBlockedIds: ARRAY,
        },
      },
    },
  });
};
