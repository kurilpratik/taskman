import api from './api';

export type TaskType = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
};

export const fetchTasks = async (params?: {
  page?: number;
  limit?: number;
  status?: 'completed' | 'pending';
  search?: string;
}) => {
  const res = await api.get('/tasks', { params });
  return res.data;
};

export const createTask = async (data: { title: string }) => {
  const res = await api.post('/tasks', data);
  return res.data;
};

export const updateTask = async (id: string, data: { title: string }) => {
  await api.patch(`/tasks/${id}`, data);
};

export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};

export const toggleTask = async (id: string) => {
  const res = await api.post(`/tasks/${id}/toggle`);
  return res.data;
};
