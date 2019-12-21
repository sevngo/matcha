const { NODE_ENV, DEVELOPMENT } = require('../utils/constants');

exports.errorHandler = (err, req, res, next) => {
  if (NODE_ENV === DEVELOPMENT) console.log(err);
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'Server Error';
  res.status(statusCode).send({ errorMessage });
  next();
};
