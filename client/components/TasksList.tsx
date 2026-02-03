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
  status,
  onRefresh,
  search,                          // <-- NEW
}: {
  refreshKey: number;
  status?: 'completed' | 'pending';
  onRefresh: () => void;
  search?: string;                  // <-- NEW
}) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);

  // NEW: pagination state
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 6;

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const res = await fetchTasks({ page, limit, status, search }); // <-- use page & limit
        const body: any = res;
        const items: TaskType[] = body.data;
        setTasks(items);
        setTotal(body.meta?.total ?? 0); // <-- store total items
        setLoading(false);
      } catch (error) {
        console.log('Error in fetching tasks');
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, [refreshKey, status, search, page]);   // <-- include page

  // Optional: reset to first page when filters/search change
  useEffect(() => {
    setPage(1);
  }, [status, search]);

  const handleToggle = async (id: string) => {
    await toggleTask(id);
    console.log('Task toggled', id);
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdate = async () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (loading)
    return (
      <p className="text-center text-sm text-gray-500 pt-24">
        Loading tasks...
      </p>
    );

  if (!loading && tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <div>
      {tasks?.map((task) => (
        <Task
          id={task.id}
          key={task.id}
          title={task.title}
          completed={task.completed}
          createdAt={task.createdAt}
          onToggle={() => handleToggle(task.id)}
          onDelete={() => handleDelete(task.id)}
          onUpdate={handleUpdate}
        />
      ))}

      {totalPages > 1 && (
        <Pagination className="pb-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((prev) => Math.max(1, prev - 1));
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={p === page}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(p);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((prev) => Math.min(totalPages, prev + 1));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default TasksList;