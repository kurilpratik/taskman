import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import * as service from '../services/task.service';

export const getTasks = async (req: AuthRequest, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const status = req.query.status as 'completed' | 'pending' | undefined;
  const search = req.query.search as string | undefined;

  const result = await service.getTasks({
    userId: req.userId!,
    page,
    limit,
    status,
    search,
  });
  res.json(result);
};

export const getTaskById = async (req: AuthRequest, res: Response) => {
  const task = await service.getTaskById(req.params.id as string, req.userId!);
  res.json(task);
};

export const createTask = async (req: AuthRequest, res: Response) => {
  const task = await service.createTask(req.userId!, req.body.title);
  res.status(201).json(task);
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  await service.updateTask(req.params.id as string, req.userId!, req.body);
  res.sendStatus(204);
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  await service.deleteTask(req.params.id as string, req.userId!);
  res.sendStatus(204);
};

export const toggleTask = async (req: AuthRequest, res: Response) => {
  const task = await service.toggleTask(req.params.id as string, req.userId!);
  res.json(task);
};
