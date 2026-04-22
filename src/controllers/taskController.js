import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../services/taskService.js';

export async function getAllTasksHandler(req, res) {
  const tasks = await getAllTasks(req.user.id);
  res.status(200).json(tasks);
}

export async function getTaskByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const task = await getTaskById(id);

  if (task.userId !== req.user.id) {
    const error = new Error('Forbidden: you do not own this task');
    error.status = 403;
    throw error;
  }

  res.status(200).json(task);
}

export async function createTaskHandler(req, res) {
  const {
    title,
    projectId,
    categoryId,
    description,
    status,
    priority,
    dueDate,
  } = req.body;

  const taskData = {
    userId: req.user.id,
    title,
    projectId: parseInt(projectId),
    description: description ?? null,
    status,
    priority,
    dueDate: dueDate ? new Date(dueDate) : null,
  };
  if (categoryId) taskData.categoryId = parseInt(categoryId);

  const newTask = await createTask(taskData);
  res.status(201).json(newTask);
}

export async function updateTaskHandler(req, res) {
  const id = parseInt(req.params.id);

  const task = await getTaskById(id);
  if (task.userId !== req.user.id) {
    const error = new Error('Forbidden: you do not own this task');
    error.status = 403;
    throw error;
  }

  const { title, description, status, priority, dueDate, categoryId } =
    req.body;
  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (status !== undefined) updateData.status = status;
  if (priority !== undefined) updateData.priority = priority;
  if (dueDate !== undefined)
    updateData.dueDate = dueDate ? new Date(dueDate) : null;
  if (categoryId !== undefined)
    updateData.categoryId = categoryId ? parseInt(categoryId) : null;

  const updated = await updateTask(id, updateData);
  res.status(200).json(updated);
}

export async function deleteTaskHandler(req, res) {
  const id = parseInt(req.params.id);

  const task = await getTaskById(id);
  if (task.userId !== req.user.id) {
    const error = new Error('Forbidden: you do not own this task');
    error.status = 403;
    throw error;
  }

  await deleteTask(id);
  res.status(204).send();
}
