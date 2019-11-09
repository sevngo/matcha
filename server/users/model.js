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
          'usersLiked',
          'usersBlocked',
        ],
        additionalProperties: false,
        properties: {
          _id: { bsonType: 'objectId' },
          username: { bsonType: 'string', minLength: 3, maxLength: 20 },
          birthDate: { bsonType: 'date' },
          firstName: { bsonType: 'string', minLength: 3, maxLength: 20 },
          lastName: { bsonType: 'string', minLength: 3, maxLength: 20 },
          email: { bsonType: 'string', minLength: 3, maxLength: 20 },
          emailVerified: { bsonType: 'bool' },
          password: { bsonType: 'string' },
          gender: {
            bsonType: 'string',
            enum: ['male', 'female'],
          },
          interests: {
            bsonType: 'array',
            items: {
              bsonType: 'string',
              uniqueItems: true,
              maxItems: 3,
            },
          },
          biography: { bsonType: 'string', maxLength: 200 },
          images: {
            bsonType: 'array',
            items: {
              bsonType: 'object',
              properties: {
                _id: { bsonType: 'objectId' },
                data: { bsonType: 'binData' },
              },
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
          usersLiked: { bsonType: 'array', items: { bsonType: 'objectId', uniqueItems: true } },
          usersBlocked: { bsonType: 'array', items: { bsonType: 'objectId', uniqueItems: true } },
        },
      },
    },
  });
};
