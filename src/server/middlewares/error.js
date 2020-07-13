const { INTERNAL_SERVER_ERROR } = require('../utils/error');

exports.asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

exports.errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  let errorMessage;
  if (statusCode >= 500) {
    req.log.error(err.stack);
    errorMessage = INTERNAL_SERVER_ERROR;
  } else errorMessage = err.message;
  res.status(statusCode).send({ errorMessage });
  next();
};
