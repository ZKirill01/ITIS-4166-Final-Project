import express from 'express';
import {
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from '../controllers/categoryController.js';
import {
  validateId,
  validateCreateCategory,
  validateUpdateCategory,
} from '../middleware/categoryValidators.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.get('/', authenticate, getAllCategoriesHandler);
router.get('/:id', authenticate, validateId, getCategoryByIdHandler);
router.post('/', authenticate, validateCreateCategory, createCategoryHandler);
router.put(
  '/:id',
  authenticate,
  validateId,
  validateUpdateCategory,
  updateCategoryHandler,
);
router.delete('/:id', authenticate, validateId, deleteCategoryHandler);

export default router;
