exports.errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'Server Error';
  res.status(statusCode).send({ errorMessage });
  next();
};
