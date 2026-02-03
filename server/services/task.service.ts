import { date } from 'zod';
import { prisma } from '../config/db';

type GetTasksOptions = {
  userId: string;
  page: number;
  limit: number;
  status?: 'completed' | 'pending';
  search?: string;
};

export const getTasks = async ({
  userId,
  page,
  limit,
  status,
  search,
}: GetTasksOptions) => {
  const where: any = { userId };

  if (status) {
    where.completed = status === 'completed';
  }

  if (search) {
    where.title = {
      contains: search,
      mode: 'insensitive',
    };
  }

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.task.count({ where }),
  ]);

  return {
    data: tasks,
    meta: {
      page,
      limit,
      total,
    },
  };
};

export const getTaskById = async (id: string, userId: string) => {
  const task = await prisma.task.findFirst({
    where: { id, userId },
  });

  if (!task) throw new Error('Task not found');

  return task;
};

export const createTask = async (userId: string, title: string) => {
  return prisma.task.create({
    data: {
      title,
      userId,
    },
  });
};

export const updateTask = async (userId: string, id: string, title: string) => {
  const task = await prisma.task.update({
    where: { id, userId },
    data: {
      title,
    },
  });

  if (!task) throw new Error("Task not found");

  return prisma.task.update({
    where: { id },
    data: { title },
  });

  console.log(task);
};

export const deleteTask = async (id: string, userId: string) => {
  const deleted = await prisma.task.deleteMany({
    where: { id, userId },
  });
  if (!deleted.count) throw new Error('Task not found');
};

export const toggleTask = async (id: string, userId: string) => {
  const task = await prisma.task.findFirst({
    where: { id, userId },
  });
  if (!task) throw new Error('Task not found');

  return prisma.task.update({
    where: { id },
    data: { completed: !task.completed },
  });
};
