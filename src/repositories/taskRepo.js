import prisma from '../config/db.js';

export async function getAll(userId) {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      userId: true,
      projectId: true,
      categoryId: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      dueDate: true,
      createdAt: true,
    },
  });
}

export async function getById(id) {
  return prisma.task.findUnique({
    where: { id },
    include: {
      project: { select: { id: true, name: true } },
      category: { select: { id: true, name: true, urgency: true } },
    },
  });
}

export async function create(data) {
  return prisma.task.create({ data });
}

export async function update(id, data) {
  try {
    return await prisma.task.update({ where: { id }, data });
  } catch (error) {
    if (error.code === 'P2025') return null;
    if (error.code === 'P2003') {
      const err = new Error('Category not found');
      err.status = 404;
      throw err;
    }
    throw error;
  }
}

export async function remove(id) {
  try {
    return await prisma.task.delete({ where: { id } });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
