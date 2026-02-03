'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { PlusIcon } from 'lucide-react';
import { toast } from 'sonner';

import { createTask } from '@/lib/tasks';

const CreateTask = ({ onCreate }: { onCreate: () => void }) => {
  const [title, setTitle] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Creating task:', title);
    await createTask({ title });
    setTitle('');
    toast.success('Task created successfully!');
    onCreate(); // refetch tasks
  };

  return (
    <div className="sticky top-4 z-10 mx-auto my-0 sm:my-3 mb-5 w-full max-w-xl px-1 sm:px-6 lg:px-0">
      <form className="flex flex-col gap-2 sm:flex-row" onSubmit={handleSubmit}>
        <Input
          id="task"
          name="task"
          type="text"
          value={title}
          onChange={handleChange}
          placeholder="Write your task here..."
          required
          className="rounded-full border-blue-300 bg-white"
        />
        <Button type="submit" className="w-full gap-0.5 rounded-full sm:w-auto">
          <PlusIcon />
          Create Task
        </Button>
      </form>
    </div>
  );
};

export default CreateTask;
