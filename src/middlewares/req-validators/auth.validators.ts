import { body, header, query } from 'express-validator';
import validationHandler from './validation-handler';

const signup = [
  body('firstName').exists(),
  body('lastName').exists(),
  body('email').exists().isEmail(),
  body('password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .withMessage(
      'Password must be at least 8 characters, and include both uppercase and lowercase letters.',
    ),
  validationHandler,
];

const updatePasswordVaidator = [
  body('newPassword')
    .matches(/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .withMessage(
      'Password must be at least 8 characters, and include both uppercase and lowercase letters.',
    ),
  validationHandler,
];

const googleAuth = [
  body('firstName').exists(),
  body('lastName').exists(),
  body('email').exists().isEmail(),
  validationHandler,
];

const signupcomplete = [
  body('firstName').exists(),
  body('lastName').exists(),
  body('password').exists(),
  validationHandler,
];

const login = [
  body('email')
    .exists()
    .isEmail()
    .withMessage('Email must be a valid email address'),
  body('password')
    .exists()
    .withMessage('Password is required and must be at least 6 characters long'),
  validationHandler,
];

const sendResetPasswordValidator = [
  body('email').exists().isEmail(),
  validationHandler,
];

const session = [header('Authorization').exists(), validationHandler];

const resetSession = [
  query('logoutOfAllDevices').exists().isBoolean(),
  validationHandler,
];

const actionTokenValidator = [
  query('token').exists().isJWT(),
  validationHandler,
];

const updateUserValidator = [
  body('password').optional().isString(),
  body('username').optional().isString(),
  body('firstName').optional().isString(),
  body('lastName').optional().isString(),
  body('newPassword').optional().isString(),
  body('newEmail').optional().isEmail(),
  validationHandler,
];

const deactivateUserValidator = [body('password').exists(), validationHandler];
export {
  login,
  signup,
  googleAuth,
  signupcomplete,
  session,
  actionTokenValidator,
  resetSession,
  updateUserValidator,
  deactivateUserValidator,
  sendResetPasswordValidator,
  updatePasswordVaidator,
};
