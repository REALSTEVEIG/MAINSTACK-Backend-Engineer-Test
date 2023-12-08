import { body, param } from 'express-validator';
import mongoose from 'mongoose';
import validationHandler from './validation-handler';

const allowedProperties = ['name', 'description', 'price']; // List of allowed properties

const createValidator = [
  body('name').exists().withMessage('Name is required'),
  body('description').exists().withMessage('Description is required'),
  body('price').exists().withMessage('Price is required'),
  body().custom((value, { req }) => {
    const receivedProperties = Object.keys(req.body);
    const extraProperties = receivedProperties.filter(
      (prop) => !allowedProperties.includes(prop),
    );

    if (extraProperties.length > 0) {
      throw new Error(
        `Extra properties are not allowed: ${extraProperties.join(', ')}`,
      );
    }
    return true;
  }),
  validationHandler,
];

const getIdValidator = [
  param('id')
    .exists()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('roleId must be a valid ObjectId'),
  validationHandler,
];

export { createValidator, getIdValidator };
