import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/categoryRepo.js';

export async function getAllCategories(userId) {
  return getAll(userId);
}

export async function getCategoryById(id) {
  const category = await getById(id);
  if (category) return category;
  const error = new Error(`Category ${id} not found`);
  error.status = 404;
  throw error;
}

export async function createCategory(data) {
  return create(data);
}

export async function updateCategory(id, data) {
  const updated = await update(id, data);
  if (updated) return updated;
  const error = new Error(`Category ${id} not found`);
  error.status = 404;
  throw error;
}

export async function deleteCategory(id) {
  const result = await remove(id);
  if (result) return;
  const error = new Error(`Category ${id} not found`);
  error.status = 404;
  throw error;
}
