import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../services/projectService.js';

export async function getAllProjectsHandler(req, res) {
  const projects = await getAllProjects(req.user.id);
  res.status(200).json(projects);
}

export async function getProjectByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const project = await getProjectById(id);

  if (project.userId !== req.user.id) {
    const error = new Error('Forbidden: you do not own this project');
    error.status = 403;
    throw error;
  }

  res.status(200).json(project);
}

export async function createProjectHandler(req, res) {
  const { name, description, status } = req.body;
  const newProject = await createProject({
    userId: req.user.id,
    name,
    description,
    status,
  });
  res.status(201).json(newProject);
}

export async function updateProjectHandler(req, res) {
  const id = parseInt(req.params.id);

  // Check ownership
  const project = await getProjectById(id);
  if (project.userId !== req.user.id) {
    const error = new Error('Forbidden: you do not own this project');
    error.status = 403;
    throw error;
  }

  const { name, description, status } = req.body;
  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (status !== undefined) updateData.status = status;

  const updated = await updateProject(id, updateData);
  res.status(200).json(updated);
}

export async function deleteProjectHandler(req, res) {
  const id = parseInt(req.params.id);

  // Check ownership
  const project = await getProjectById(id);
  if (project.userId !== req.user.id) {
    const error = new Error('Forbidden: you do not own this project');
    error.status = 403;
    throw error;
  }

  await deleteProject(id);
  res.status(204).send();
}
