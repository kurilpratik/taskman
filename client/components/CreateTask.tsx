'use client';

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

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
    <div className="mx-auto my-6 w-xl">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <Input
          id="task"
          name="task"
          type="text"
          value={title}
          onChange={handleChange}
          placeholder="Write your task here..."
          required
          className="bg-white"
        />
        <Button type="submit">Create Task</Button>
      </form>
    </div>
  );
};

export default CreateTask;
