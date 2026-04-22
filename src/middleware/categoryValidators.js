import { body, param, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id')
    .trim()
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer'),
  handleValidationErrors,
];

export const validateCreateCategory = [
  body('name')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Name is required')
    .bail()
    .isLength({ min: 1 })
    .withMessage('Name cannot be empty'),

  body('urgency')
    .optional()
    .trim()
    .isString()
    .withMessage('Urgency must be a string'),

  handleValidationErrors,
];

export const validateUpdateCategory = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('urgency').exists({ values: 'falsy' }),
    ],
    { message: 'At least one field (name, urgency) must be provided' },
  ),

  body('name')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Name cannot be empty'),
  body('urgency')
    .optional()
    .trim()
    .isString()
    .withMessage('Urgency must be a string'),

  handleValidationErrors,
];
