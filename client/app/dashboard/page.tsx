 'use client';

import { useState } from 'react';
import CreateTask from '@/components/CreateTask';
import Search from '@/components/Search';
import TasksList from '@/components/TasksList';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="">
      <CreateTask onCreate={() => setRefreshKey((prev) => prev + 1)} />
      <Tabs defaultValue="all" className="mx-auto w-xl">
        <div className="flex">
          <TabsList variant="line">
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <Search />
        </div>
        <TabsContent value="all">
          <TasksList refreshKey={refreshKey} />
        </TabsContent>
        <TabsContent value="pending">
          <TasksList refreshKey={refreshKey} />
        </TabsContent>
        <TabsContent value="completed">
          <TasksList refreshKey={refreshKey} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
