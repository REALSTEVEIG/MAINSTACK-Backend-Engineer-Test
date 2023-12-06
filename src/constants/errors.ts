/* eslint-disable import/no-extraneous-dependencies */
import { StatusCodes } from 'http-status-codes';
import { type Errors } from '@/types/index';

const errors: Errors = {
  // General errors
  unexpectedError: {
    errorCode: 'unexpected-error',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'An unexpected error occurred',
  },
  invalidRequest: {
    errorCode: 'invalid-request',
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Invalid request',
  },

  // Authentication and authorization errors
  /* Will be used is session cookie is not valid */
  unauthorized: {
    errorCode: 'unauthorized',
    statusCode: StatusCodes.UNAUTHORIZED,
    message: 'Unauthorized access',
  },
  forbidden: {
    errorCode: 'forbidden',
    statusCode: StatusCodes.FORBIDDEN,
    message: 'Access forbidden',
  },
  authenticationFailed: {
    errorCode: 'authentication-failed',
    statusCode: StatusCodes.UNAUTHORIZED,
    message: 'Authentication failed',
  },
  accountLocked: {
    errorCode: 'account-locked',
    statusCode: StatusCodes.FORBIDDEN,
    message: 'Account is locked',
  },
  invalidAuthorizationCode: {
    errorCode: 'invalid-authorization-code',
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Invalid authorization code',
  },

  validationError: {
    errorCode: 'validation-error',
    statusCode: StatusCodes.BAD_REQUEST,
    message: '', // You'll fill this in dynamically
  },

  // User-related errors
  userNotFound: {
    errorCode: 'user-not-found',
    statusCode: StatusCodes.NOT_FOUND,
    message: 'User not found',
  },
  userAlreadyExists: {
    errorCode: 'user-already-exists',
    statusCode: StatusCodes.CONFLICT,
    message: 'User already exists',
  },
  invalidCredentials: {
    errorCode: 'invalid-credentials',
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Invalid credentials',
  },

  // Login API errors
  loginFailed: {
    errorCode: 'login-failed',
    statusCode: StatusCodes.UNAUTHORIZED,
    message: 'Login failed',
  },
  invalidEmailOrPassword: {
    errorCode: 'invalid-email-or-password',
    statusCode: StatusCodes.UNAUTHORIZED,
    message: 'Invalid email or password',
  },
  invalidGoogleAuth: {
    errorCode: 'invalid-google-auth',
    statusCode: StatusCodes.UNAUTHORIZED,
    message: 'Email already registered with password',
  },
  invalidEmailLogin: {
    errorCode: 'invalid-email-auth',
    statusCode: StatusCodes.UNAUTHORIZED,
    message: 'Email already registered with Google',
  },
  accountInactive: {
    errorCode: 'account-inactive',
    statusCode: StatusCodes.FORBIDDEN,
    message: 'Account is inactive',
  },

  // Signup API errors
  signupFailed: {
    errorCode: 'signup-failed',
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Signup failed',
  },
  invalidSignupData: {
    errorCode: 'invalid-signup-data',
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Invalid signup data',
  },

  // Session API errors
  sessionExpired: {
    errorCode: 'session-expired',
    statusCode: StatusCodes.UNAUTHORIZED,
    message: 'Session expired',
  },
  sessionNotFound: {
    errorCode: 'session-not-found',
    statusCode: StatusCodes.NOT_FOUND,
    message: 'Session not found',
  },

  // Common errors
  recordNotFound: {
    errorCode: 'record-not-found',
    statusCode: StatusCodes.NOT_FOUND,
    message: 'Record not found',
  },
  invalidInput: {
    errorCode: 'invalid-input',
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Invalid input',
  },
  missingInputForEmail: {
    errorCode: 'missing-input-for-email',
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Provide old and new email',
  },
  fileNotFound: {
    errorCode: 'file-not-found',
    statusCode: StatusCodes.NOT_FOUND,
    message: 'File not found',
  },
  /* Will be used if any of the token is invalid */
  accessDenied: {
    errorCode: 'access-denied',
    statusCode: StatusCodes.FORBIDDEN,
    message: 'Access denied',
  },
  resourceAlreadyExists: {
    errorCode: 'resource-already-exists',
    statusCode: StatusCodes.CONFLICT,
    message: 'Resource already exists',
  },
  errBadRequest: {
    errorCode: 'ERR_BAD_REQUEST',
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'BAD ERROR REQUEST',
  },

  // Server errors
  notImplemented: {
    errorCode: 'not-implemented',
    statusCode: StatusCodes.CONFLICT,
    message: 'Not implemented',
  },
  passwordRequired: {
    errorCode: 'password-required',
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Password is required',
  },
  userDeactivated: {
    errorCode: 'user-deactivated',
    statusCode: StatusCodes.FORBIDDEN,
    message: 'User is deactivated',
  },
};

export default errors;
