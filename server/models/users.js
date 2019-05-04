const { string, objectId, date, bool, array, object } = require('../utils/constants');

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
          _id: objectId,
          username: string,
          birthDate: date,
          firstName: string,
          lastName: string,
          email: string,
          emailVerified: bool,
          password: string,
          gender: {
            enum: ['male', 'female'],
          },
          interests: array,
          biography: string,
          images: array,
          address: object,
          usersBlocked: array,
          token: string,
        },
      },
    },
  });
};

module.exports = { usersModel, USERS };
