import express from 'express';
import {
  getAllTasksHandler,
  getTaskByIdHandler,
  createTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
} from '../controllers/taskController.js';
import {
  validateId,
  validateCreateTask,
  validateUpdateTask,
} from '../middleware/taskValidators.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.get('/', authenticate, getAllTasksHandler);
router.get('/:id', authenticate, validateId, getTaskByIdHandler);
router.post('/', authenticate, validateCreateTask, createTaskHandler);
router.put(
  '/:id',
  authenticate,
  validateId,
  validateUpdateTask,
  updateTaskHandler,
);
router.delete('/:id', authenticate, validateId, deleteTaskHandler);

export default router;
