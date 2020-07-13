exports.ErrorResponse = class ErrorResponse extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
};

exports.INTERNAL_SERVER_ERROR = 'Internal Server Error';
exports.IDENTIFICATION_FAILED = 'Identification Failed';
exports.UNAUTHORIZED = 'Unauthorized';
exports.UNVERIFIED_EMAIL = 'Unverified Email';
exports.USER_NOT_FOUND = 'User Not Found';
exports.EMAIL_NOT_FOUND = 'Email Not Found';
exports.BAD_PARAMETERS = 'Bad Parameters';
exports.INVALID_IMAGE_FORMAT = 'Invalid Image Format';
