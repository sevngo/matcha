const { ObjectID } = require('mongodb');
const { ErrorResponse } = require('../utils/functions');

exports.isValidObjectId = param => (req, res, next) => {
  if (!ObjectID.isValid(req.params[param])) next(new ErrorResponse(400, 'Bad parameters'));
  next();
};
