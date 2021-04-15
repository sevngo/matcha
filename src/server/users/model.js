import { USERS_COLLECTION } from '../utils/enums.js';

export const usersModel = async (db) => {
  await db
    .collection(USERS_COLLECTION)
    .createIndex({ username: 1 }, { unique: true, sparse: true });
  await db
    .collection(USERS_COLLECTION)
    .createIndex({ email: 1 }, { unique: true, sparse: true });
  await db.collection(USERS_COLLECTION).createIndex({ address: '2dsphere' });
  return db.command({
    collMod: USERS_COLLECTION,
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'username',
          'birthDate',
          'email',
          'password',
          'gender',
          'address',
        ],
        additionalProperties: false,
        properties: {
          _id: { bsonType: 'objectId' },
          username: { bsonType: 'string', minLength: 3, maxLength: 50 },
          birthDate: { bsonType: 'date' },
          email: { bsonType: 'string', minLength: 3, maxLength: 50 },
          emailVerified: { bsonType: 'bool' },
          password: { bsonType: 'string' },
          gender: {
            bsonType: 'string',
            enum: ['male', 'female'],
          },
          image: {
            bsonType: 'object',
            properties: {
              buffer: { bsonType: 'binData' },
              _id: { bsonType: 'objectId' },
            },
          },
          address: {
            bsonType: 'object',
            required: ['name', 'type', 'coordinates'],
            properties: {
              name: { bsonType: 'string' },
              type: { bsonType: 'string' },
              coordinates: {
                bsonType: 'array',
                items: {
                  bsonType: 'double',
                },
              },
            },
          },
          usersLiked: {
            bsonType: 'array',
            items: { bsonType: 'objectId', uniqueItems: true },
          },
        },
      },
    },
  });
};
