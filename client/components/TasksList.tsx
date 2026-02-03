'use client';

import React, { useEffect, useState } from 'react';
import Task from './Task';

import { fetchTasks, TaskType, toggleTask, deleteTask } from '@/lib/tasks';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';


const TasksList = ({
  refreshKey,
}: {
  refreshKey: number;
}) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const res = await fetchTasks({ page: 1, limit: 10 });
        const body: any = res;
        const items: TaskType[] = body.data;
        setTasks(items);
        setLoading(false);
      } catch (error) {
        console.log('Error in fetching tasks');
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, [refreshKey]);

  const handleToggle = async (id: string) => {
    await toggleTask(id);
    console.log('Task toggled', id);
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

const handleDelete = async (id: string) => {
  await deleteTask(id);
  setTasks(prev => prev.filter(t => t.id !== id));
};

  if (loading) return <p className="text-center text-sm text-gray-500 pt-24">Loading tasks...</p>;

  if (!loading && tasks.length === 0) {
    return <p>No tasks found.</p>;
  }
  return (
    <div>
      {tasks?.map((task) => (
        <Task
          id={task.id} // Needed for the TaskProps
          key={task.id} // Needed for React list rendering
          title={task.title}
          completed={task.completed}
          createdAt={task.createdAt}
          onToggle={() => handleToggle(task.id)}
          onDelete={() => handleDelete(task.id)}
        />
      ))}
      <Pagination className="pb-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TasksList;
