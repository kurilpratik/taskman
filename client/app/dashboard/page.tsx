'use client';

import { useState } from 'react';
import CreateTask from '@/components/CreateTask';
import Search from '@/components/Search';
import TasksList from '@/components/TasksList';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('pending');

  const getStatusParam = (): 'completed' | 'pending' | undefined => {
    if (statusFilter === 'all') return undefined;
    return statusFilter;
  };

  return (
    <div className="">
      <CreateTask onCreate={() => setRefreshKey((prev) => prev + 1)} />
      <Tabs 
        defaultValue="pending" 
        className="mx-auto w-xl"
        onValueChange={(value) => setStatusFilter(value as 'all' | 'completed' | 'pending')}
      >
        <div className="flex">
          <TabsList variant="line">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <Search />
        </div>
        <TabsContent value="pending">
          <TasksList 
            refreshKey={refreshKey} 
            status={getStatusParam()} 
            onRefresh={() => setRefreshKey((prev) => prev + 1)}
          />
        </TabsContent>
        <TabsContent value="completed">
          <TasksList 
            refreshKey={refreshKey} 
            status={getStatusParam()} 
            onRefresh={() => setRefreshKey((prev) => prev + 1)}
          />
        </TabsContent>
        <TabsContent value="all">
          <TasksList 
            refreshKey={refreshKey} 
            status={getStatusParam()} 
            onRefresh={() => setRefreshKey((prev) => prev + 1)}
          />
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default Dashboard;