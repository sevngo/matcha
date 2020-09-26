const { INTERNAL_SERVER_ERROR } = require('../utils/error');

exports.asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

exports.errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (!statusCode) {
    req.log.error(err.stack);
    message = INTERNAL_SERVER_ERROR;
    statusCode = 500;
  }
  res.status(statusCode).send({ message });
  next();
};
