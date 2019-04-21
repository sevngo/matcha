const express = require('express');
const path = require('path');
const { connectDb } = require('./database');
const usersRouter = require('./routers/users');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', usersRouter);

app.use(express.static('dist'));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'dist', 'index.html')));

(async () => {
  try {
    await connectDb();
    await app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); // eslint-disable-line no-console
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
  }
})();
