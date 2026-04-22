import prisma from '../config/db.js';

export async function createUser(data) {
  try {
    const newUser = await prisma.user.create({
      data,
      omit: { password: true },
    });
    return newUser;
  } catch (error) {
    if (error.code === 'P2002') {
      const field = error.meta?.target?.includes('username')
        ? 'Username'
        : 'Email';
      const err = new Error(`${field} has already been used`);
      err.status = 409;
      throw err;
    }
    throw error;
  }
}

export async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}
