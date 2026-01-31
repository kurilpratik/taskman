import CreateTask from '@/components/CreateTask';
import Task from '@/components/Task';
import React from 'react';

const Dashboard = () => {
  return (
    <div className="">
      {/* <p className="text-center">Welcome to your dashboard!</p> */}
      <CreateTask />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
    </div>
  );
};

export default Dashboard;
