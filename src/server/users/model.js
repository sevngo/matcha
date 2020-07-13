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
      },
    },
  });
};
