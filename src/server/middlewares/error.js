exports.errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  let errorMessage;
  if (statusCode >= 500) {
    req.log.error(err.stack);
    errorMessage = 'internal server error';
  } else errorMessage = err.message;
  res.status(statusCode).send({ errorMessage });
  next();
};
