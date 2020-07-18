const USERS = 'users';

exports.USERS = USERS;

exports.usersModel = async (db) => {
  await db.createCollection(USERS);
  await db
    .collection(USERS)
    .createIndex({ username: 1 }, { unique: true, sparse: true });
  await db
    .collection(USERS)
    .createIndex({ email: 1 }, { unique: true, sparse: true });
  await db.collection(USERS).createIndex({ address: '2dsphere' });
  return db.command({
    collMod: USERS,
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
          username: { bsonType: 'string', minLength: 3, maxLength: 40 },
          birthDate: { bsonType: 'date' },
          email: { bsonType: 'string', minLength: 3, maxLength: 40 },
          emailVerified: { bsonType: 'bool' },
          password: { bsonType: 'string' },
          gender: {
            bsonType: 'string',
            enum: ['male', 'female'],
          },
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
          usersLiked: {
            bsonType: 'array',
            items: { bsonType: 'objectId', uniqueItems: true },
          },
          usersBlocked: {
            bsonType: 'array',
            items: { bsonType: 'objectId', uniqueItems: true },
          },
          socketId: { bsonType: 'string' },
        },
      },
    },
  });
};
