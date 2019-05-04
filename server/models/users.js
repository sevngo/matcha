const { STRING, OBJECTID, DATE, BOOL, ARRAY, OBJECT } = require('../utils/constants');

const USERS = 'users';

const usersModel = async db => {
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
          'usersBlocked',
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
          address: OBJECT,
          usersBlocked: ARRAY,
          token: STRING,
        },
      },
    },
  });
};

module.exports = { usersModel, USERS };
