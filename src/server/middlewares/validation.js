const { validationResult } = require('express-validator');
const multer = require('multer');
const { ErrorResponse, INVALID_IMAGE_FORMAT } = require('../utils/error');

exports.validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    const { msg, location, param } = errors.array()[0];
    res.status(422).send({ errorMessage: msg, location, param });
  };
};

exports.uploadImage = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/))
      return cb(new ErrorResponse(400, INVALID_IMAGE_FORMAT));
    cb(undefined, true);
  },
});
