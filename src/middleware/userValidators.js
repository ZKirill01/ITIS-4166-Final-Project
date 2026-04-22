import { body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateSignUp = [
  body('username')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Username is required')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters'),

  body('email')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Email is not valid')
    .bail()
    .normalizeEmail(),

  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 8, max: 64 })
    .withMessage('Password must be between 8 and 64 characters'),

  handleValidationErrors,
];

export const validateLogIn = [
  body('email')
    .trim()
    .exists({ values: 'falsy' })
    .withMessage('Email is required')
    .bail()
    .normalizeEmail(),

  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Password is required'),

  handleValidationErrors,
];
