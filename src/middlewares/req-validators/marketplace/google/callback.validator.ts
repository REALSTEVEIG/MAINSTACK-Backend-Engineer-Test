import { query } from 'express-validator';
import validationHandler from '../../validation-handler';

const installGoogleCalendarValidator = [
  query('code').exists().isString(),
  validationHandler,
];

export { installGoogleCalendarValidator };
