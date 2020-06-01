const { ObjectID } = require('mongodb');
const { ErrorResponse } = require('../utils/functions');

exports.isValidObjectId = (param) => (req, res, next) => {
  if (!ObjectID.isValid(req.params[param]))
    return next(new ErrorResponse(400, 'bad parameters'));
  next();
};
