const stringRequired = {
  bsonType: 'string',
  minLength: 3,
  maxLength: 30,
};

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
        ],
        additionalProperties: false,
        properties: {
          _id: { bsonType: 'objectId' },
          username: stringRequired,
          birthDate: { bsonType: 'date' },
          firstName: stringRequired,
          lastName: stringRequired,
          email: stringRequired,
          password: { bsonType: 'string' },
          gender: {
            enum: ['male', 'female'],
          },
          interests: {
            bsonType: 'array',
          },
          biography: {
            bsonType: 'string',
            maxLength: 300,
          },
          images: { bsonType: 'array' },
          address: { bsonType: 'object' },
        },
      },
    },
  });
};

module.exports = { usersModel, USERS };
