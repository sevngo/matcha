const { ObjectID } = require('mongodb');
const { ErrorResponse, BAD_PARAMETERS } = require('../utils/error');

exports.isValidObjectId = (param) => (req, res, next) => {
  if (!ObjectID.isValid(req.params[param]))
    return next(new ErrorResponse(400, BAD_PARAMETERS));
  next();
};
