import { body, param, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id')
    .trim()
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer'),
  handleValidationErrors,
];

export const validateCreateTask = [
  body('title')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Title is required')
    .bail()
    .isLength({ min: 1 })
    .withMessage('Title cannot be empty'),

  body('projectId')
    .exists({ values: 'falsy' })
    .withMessage('projectId is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('projectId must be a positive integer'),

  body('categoryId')
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage('categoryId must be a positive integer'),

  body('description').optional({ nullable: true }).trim().isString(),

  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Status must be one of pending, in-progress, completed'),

  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be one of low, medium, high'),

  body('dueDate')
    .optional({ nullable: true })
    .isISO8601()
    .withMessage('dueDate must be a valid ISO 8601 date'),

  handleValidationErrors,
];

export const validateUpdateTask = [
  oneOf(
    [
      body('title').exists({ values: 'falsy' }),
      body('description').exists({ values: 'falsy' }),
      body('status').exists({ values: 'falsy' }),
      body('priority').exists({ values: 'falsy' }),
      body('dueDate').exists({ values: 'falsy' }),
      body('categoryId').exists({ values: 'falsy' }),
    ],
    {
      message:
        'At least one field (title, description, status, priority, dueDate, categoryId) must be provided',
    },
  ),

  body('title')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Title cannot be empty'),
  body('description').optional({ nullable: true }).trim().isString(),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Status must be one of pending, in-progress, completed'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be one of low, medium, high'),
  body('dueDate')
    .optional({ nullable: true })
    .isISO8601()
    .withMessage('dueDate must be a valid ISO 8601 date'),
  body('categoryId')
    .optional({ nullable: true })
    .isInt({ min: 1 })
    .withMessage('categoryId must be a positive integer'),

  handleValidationErrors,
];
