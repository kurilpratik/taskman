'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { PlusCircle, PlusIcon } from 'lucide-react';

const CreateTask = () => {
  const [title, setTitle] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Creating task:', title);
    // Reset the input field after submission
    setTitle('');
  };

  return (
    <div className="sticky top-4 z-10 mx-auto my-3 mb-5 w-xl">
      <form className="flex gap-2" onSubmit={handleSubmit}>
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
        <Button type="submit" className="gap-0.5 rounded-full">
          <PlusIcon />
          Create Task
        </Button>
      </form>
    </div>
  );
};

export default CreateTask;
