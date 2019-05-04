const app = require('./app');
const { connectDb } = require('./database');
const { PORT } = require('./utils/constants');

(async () => {
  try {
    await connectDb();
    await app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); // eslint-disable-line no-console
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
  }
})();
