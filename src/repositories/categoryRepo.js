import prisma from '../config/db.js';

export async function getAll(userId) {
  return prisma.category.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      userId: true,
      name: true,
      urgency: true,
      createdAt: true,
    },
  });
}

export async function getById(id) {
  return prisma.category.findUnique({ where: { id } });
}

export async function create(data) {
  try {
    return await prisma.category.create({ data });
  } catch (error) {
    if (error.code === 'P2002') {
      const err = new Error('Category name already exists for this user');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function update(id, data) {
  try {
    return await prisma.category.update({ where: { id }, data });
  } catch (error) {
    if (error.code === 'P2025') return null;
    if (error.code === 'P2002') {
      const err = new Error('Category name already exists for this user');
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function remove(id) {
  try {
    return await prisma.category.delete({ where: { id } });
  } catch (error) {
    if (error.code === 'P2025') return null;
    throw error;
  }
}
