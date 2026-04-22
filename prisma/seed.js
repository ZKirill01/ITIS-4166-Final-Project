import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

try {
  await prisma.$queryRaw`TRUNCATE tasks, categories, projects, users RESTART IDENTITY CASCADE;`;

  const usersData = [
    { username: 'alice', email: 'alice@example.com', password: 'alice1234' },
    { username: 'bob', email: 'bob@example.com', password: 'bob1234' },
  ];

  const users = [];
  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
      },
    });
    users.push(user);
  }

  const [alice, bob] = users;

  const aliceProjects = await Promise.all([
    prisma.project.create({
      data: {
        userId: alice.id,
        name: 'School',
        description: 'CS coursework',
        status: 'active',
      },
    }),
    prisma.project.create({
      data: {
        userId: alice.id,
        name: 'Personal',
        description: 'Personal errands',
        status: 'active',
      },
    }),
  ]);

  const bobProjects = await Promise.all([
    prisma.project.create({
      data: {
        userId: bob.id,
        name: 'Work',
        description: 'Work tasks',
        status: 'active',
      },
    }),
  ]);

  const aliceCategories = await Promise.all([
    prisma.category.create({
      data: { userId: alice.id, name: 'ASAP', urgency: 'high' },
    }),
    prisma.category.create({
      data: { userId: alice.id, name: 'Low Priority', urgency: 'low' },
    }),
  ]);

  const bobCategories = await Promise.all([
    prisma.category.create({
      data: { userId: bob.id, name: 'Urgent', urgency: 'high' },
    }),
  ]);

  await Promise.all([
    prisma.task.create({
      data: {
        userId: alice.id,
        projectId: aliceProjects[0].id,
        categoryId: aliceCategories[0].id,
        title: 'Finish lab 4',
        description: 'Complete and submit lab 4',
        status: 'pending',
        priority: 'high',
        dueDate: new Date('2026-05-01'),
      },
    }),
    prisma.task.create({
      data: {
        userId: alice.id,
        projectId: aliceProjects[0].id,
        categoryId: aliceCategories[1].id,
        title: 'Read chapter 5',
        description: null,
        status: 'pending',
        priority: 'low',
        dueDate: new Date('2026-05-10'),
      },
    }),
    prisma.task.create({
      data: {
        userId: alice.id,
        projectId: aliceProjects[1].id,
        categoryId: null,
        title: 'Buy groceries',
        description: 'Milk, eggs, bread',
        status: 'completed',
        priority: 'medium',
        dueDate: null,
      },
    }),
  ]);

  await Promise.all([
    prisma.task.create({
      data: {
        userId: bob.id,
        projectId: bobProjects[0].id,
        categoryId: bobCategories[0].id,
        title: 'Prepare presentation',
        description: 'Q2 review presentation',
        status: 'pending',
        priority: 'high',
        dueDate: new Date('2026-04-30'),
      },
    }),
  ]);

  console.log('Seed completed successfully!');
} catch (error) {
  console.error('Seed failed:', error);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
