import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/categoryService.js';

export async function getAllCategoriesHandler(req, res) {
  const categories = await getAllCategories(req.user.id);
  res.status(200).json(categories);
}

export async function getCategoryByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const category = await getCategoryById(id);

  if (category.userId !== req.user.id) {
    const error = new Error('Forbidden: you do not own this category');
    error.status = 403;
    throw error;
  }

  res.status(200).json(category);
}

export async function createCategoryHandler(req, res) {
  const { name, urgency } = req.body;
  const newCategory = await createCategory({
    userId: req.user.id,
    name,
    urgency,
  });
  res.status(201).json(newCategory);
}

export async function updateCategoryHandler(req, res) {
  const id = parseInt(req.params.id);

  const category = await getCategoryById(id);
  if (category.userId !== req.user.id) {
    const error = new Error('Forbidden: you do not own this category');
    error.status = 403;
    throw error;
  }

  const { name, urgency } = req.body;
  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (urgency !== undefined) updateData.urgency = urgency;

  const updated = await updateCategory(id, updateData);
  res.status(200).json(updated);
}

export async function deleteCategoryHandler(req, res) {
  const id = parseInt(req.params.id);

  const category = await getCategoryById(id);
  if (category.userId !== req.user.id) {
    const error = new Error('Forbidden: you do not own this category');
    error.status = 403;
    throw error;
  }

  await deleteCategory(id);
  res.status(204).send();
}
