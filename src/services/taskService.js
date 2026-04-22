import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/taskRepo.js';
import { getById as getProjectById } from '../repositories/projectRepo.js';
import { getById as getCategoryById } from '../repositories/categoryRepo.js';

export async function getAllTasks(userId) {
  return getAll(userId);
}

export async function getTaskById(id) {
  const task = await getById(id);
  if (task) return task;
  const error = new Error(`Task ${id} not found`);
  error.status = 404;
  throw error;
}

export async function createTask(data) {
  const project = await getProjectById(data.projectId);
  if (!project) {
    const error = new Error(`Project ${data.projectId} not found`);
    error.status = 404;
    throw error;
  }
  if (project.userId !== data.userId) {
    const error = new Error('Forbidden: you do not own this project');
    error.status = 403;
    throw error;
  }
  if (data.categoryId) {
    const category = await getCategoryById(data.categoryId);
    if (!category) {
      const error = new Error(`Category ${data.categoryId} not found`);
      error.status = 404;
      throw error;
    }
  }
  return create(data);
}

export async function updateTask(id, data) {
  if (data.categoryId) {
    const category = await getCategoryById(data.categoryId);
    if (!category) {
      const error = new Error(`Category ${data.categoryId} not found`);
      error.status = 404;
      throw error;
    }
  }
  const updated = await update(id, data);
  if (updated) return updated;
  const error = new Error(`Task ${id} not found`);
  error.status = 404;
  throw error;
}

export async function deleteTask(id) {
  const result = await remove(id);
  if (result) return;
  const error = new Error(`Task ${id} not found`);
  error.status = 404;
  throw error;
}
