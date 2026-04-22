import prisma from '../config/db.js';

export async function getAll(userId) {
  return prisma.project.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      userId: true,
      name: true,
      description: true,
      status: true,
      createdAt: true,
    },
  });
}

export async function getById(id) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      tasks: {
        select: { id: true, title: true, status: true, priority: true },
      },
    },
  });
}

export async function create(data) {
  return prisma.project.create({ data });
}

export async function update(id, data) {
  try {
    return await prisma.project.update({ where: { id }, data });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}

export async function remove(id) {
  try {
    return await prisma.project.delete({ where: { id } });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
