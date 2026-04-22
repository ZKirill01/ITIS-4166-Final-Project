import { body, param, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id')
    .trim()
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer'),
  handleValidationErrors,
];

export const validateCreateProject = [
  body('name')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Name is required')
    .bail()
    .isLength({ min: 1 })
    .withMessage('Name cannot be empty'),

  body('description')
    .optional()
    .trim()
    .isString()
    .withMessage('Description must be a string'),

  body('status')
    .optional()
    .isIn(['active', 'completed', 'archived'])
    .withMessage('Status must be one of active, completed, archived'),

  handleValidationErrors,
];

export const validateUpdateProject = [
  oneOf(
    [
      body('name').exists({ values: 'falsy' }),
      body('description').exists({ values: 'falsy' }),
      body('status').exists({ values: 'falsy' }),
    ],
    {
      message:
        'At least one field (name, description, status) must be provided',
    },
  ),

  body('name')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Name cannot be empty'),
  body('description')
    .optional()
    .trim()
    .isString()
    .withMessage('Description must be a string'),
  body('status')
    .optional()
    .isIn(['active', 'completed', 'archived'])
    .withMessage('Status must be one of active, completed, archived'),

  handleValidationErrors,
];
