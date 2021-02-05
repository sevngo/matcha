import { INTERNAL_SERVER_ERROR } from '../utils/enums.js';

export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (!statusCode) {
    req.log.error(err.stack);
    message = INTERNAL_SERVER_ERROR;
    statusCode = 500;
  }
  res.status(statusCode).send({ message });
  next();
};
