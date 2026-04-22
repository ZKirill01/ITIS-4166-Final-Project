import express from 'express';
import {
  getAllProjectsHandler,
  getProjectByIdHandler,
  createProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
} from '../controllers/projectController.js';
import {
  validateId,
  validateCreateProject,
  validateUpdateProject,
} from '../middleware/projectValidators.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.get('/', authenticate, getAllProjectsHandler);
router.get('/:id', authenticate, validateId, getProjectByIdHandler);
router.post('/', authenticate, validateCreateProject, createProjectHandler);
router.put(
  '/:id',
  authenticate,
  validateId,
  validateUpdateProject,
  updateProjectHandler,
);
router.delete('/:id', authenticate, validateId, deleteProjectHandler);

export default router;
