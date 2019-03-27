const stringRequired = {
  bsonType: 'string',
  minLength: 3,
  maxLength: 20,
};

const USERS = 'users';

const usersModel = async db => {
  await db.createCollection(USERS);
  await db.collection(USERS).createIndex({ username: 1 }, { unique: true, sparse: true });
  await db.collection(USERS).createIndex({ email: 1 }, { unique: true, sparse: true });
  return db.command({
    collMod: USERS,
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['username', 'birthDate', 'firstName', 'lastName', 'email', 'password', 'gender'],
        additionalProperties: false,
        properties: {
          _id: { bsonType: 'objectId' },
          username: stringRequired,
          birthDate: { bsonType: 'string', minLength: 10, maxLength: 10 },
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
            maxLength: 200,
          },
          images: { bsonType: 'array' },
        },
      },
    },
  });
};

module.exports = { usersModel, USERS };
