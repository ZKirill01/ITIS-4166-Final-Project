import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/projectRepo.js';

export async function getAllProjects(userId) {
  return getAll(userId);
}

export async function getProjectById(id) {
  const project = await getById(id);
  if (project) return project;
  const error = new Error(`Project ${id} not found`);
  error.status = 404;
  throw error;
}

export async function createProject(data) {
  return create(data);
}

export async function updateProject(id, data) {
  const updated = await update(id, data);
  if (updated) return updated;
  const error = new Error(`Project ${id} not found`);
  error.status = 404;
  throw error;
}

export async function deleteProject(id) {
  const result = await remove(id);
  if (result) return;
  const error = new Error(`Project ${id} not found`);
  error.status = 404;
  throw error;
}
