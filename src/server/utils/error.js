export const ErrorResponse = class ErrorResponse extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
};

export const INTERNAL_SERVER_ERROR = 'Internal Server Error';
export const IDENTIFICATION_FAILED = 'Identification Failed';
export const UNAUTHORIZED = 'Unauthorized';
export const UNVERIFIED_EMAIL = 'Unverified Email';
export const USER_NOT_FOUND = 'User Not Found';
export const IMAGE_NOT_FOUND = 'Image Not Found';
export const EMAIL_NOT_FOUND = 'Email Not Found';
export const BAD_PARAMETERS = 'Bad Parameters';
export const INVALID_IMAGE_FORMAT = 'Invalid Image Format';
